<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ClientService
{
    public function __construct(private CarService $carService) {}

    public function getClients($paginated = true, $size = 10, $search = null): Collection | LengthAwarePaginator
    {

        $query = Client::query()->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%")
                ->orWhere('phone', 'like', "%$search%");
        });
        return $paginated ? $query->paginate($size) : $query->get();
    }

    public function getSingleClient($id): Client
    {
        $client = Client::findOrFail($id);
        return $client;
    }

    public function createClient($data): Client
    {
        $client = Client::create($data);
        return $client;
    }

    public function updateClient($data, $id): Client
    {
        $client = Client::findOrFail($id);
        $client->update([
            'name' => $data['name'],
            'phone' => $data['phone'],
        ]);
        return $client;
    }

    public function deleteClient($id): void
    {
        Client::findOrFail($id)->delete();
    }

    public function updateClientCars(Client $client, array $cars): Client
    {
        $carsToDelete = $client->cars->pluck('id')->toArray();

        foreach ($cars as $car) {

            //Create car if it's not in the user Cars Ids
            if (!isset($car['id'])) {
                $this->carService->createCar($car, $client);
                continue;
            }

            //Update car if it's in the user Cars Ids
            $this->carService->updateCar($car, $car['id']);

            //Remove Car from the list of cars to delete Since it's in the request
            $carsToDelete = array_diff($carsToDelete, [$car['id']]);
        }

        //Delete cars that are not in the request
        if ($carsToDelete) {
            foreach ($carsToDelete as $carId) {
                $this->carService->deleteCar($carId);
            }
        }

        return $this->getSingleClient($client->id);
    }
}
