<?php

namespace App\Http\Controllers\Api\Client;

use App\Services\CarService;
use Illuminate\Http\Request;
use App\Services\ClientService;
use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Http\Requests\Api\Client\StoreClientRequest;
use App\Http\Requests\Api\Client\UpdateClientRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientController extends Controller
{
    private ClientService $clientService;

    private CarService $carService;

    public function __construct(ClientService $clientService, CarService $carService)
    {
        $this->clientService = $clientService;
        $this->carService = $carService;
    }

    public function index(): ResourceCollection
    {
        $paginated = (bool)request()->query('paginated', true);
        $size = request()->query('size', 10);

        $clients = $this->clientService->getClients($paginated, $size);
        return  ClientResource::collection($clients);
    }

    public function show($id)
    {
        $client = $this->clientService->getSingleClient($id);
        return response()->json(['client' => new ClientResource($client)]);
    }

    public function store(StoreClientRequest $request)
    {
        $client = $this->clientService->createClient($request->validated());

        foreach ($request->cars as $car) {
            $this->carService->createCar($car, $client);
        }

        return response()->json(
            [
                'message' => 'Client Created Successfully',
                'client' => new ClientResource($client)
            ]
        );
    }

    public function update(UpdateClientRequest $request, $id)
    {
        $client = $this->clientService->getSingleClient($id);
        $clientCarsIds = $client->cars->pluck('id')->toArray();
        $carsToDelete = null;

        foreach ($request->validated('cars') as $car) {

            //Create car if it's not in the user Cars Ids
            if (!isset($car['id'])) {
                $this->carService->createCar($car, $client);
                continue;
            }

            //Update car if it's in the user Cars Ids
            $this->carService->updateCar($car, $car['id']);
            $carsToDelete = array_diff($clientCarsIds, [$car['id']]);
        }

        //Delete cars that are not in the request
        if ($carsToDelete) {
            foreach ($carsToDelete as $carId) {
                $this->carService->deleteCar($carId);
            }
        }

        $client->update($request->only(['name', 'phone']));
        $client = $this->clientService->getSingleClient($id);

        return response()->json(
            [
                'message' => 'Client Updated Successfully',
                'client' => new ClientResource($client)
            ]
        );
    }

    public function destroy($id)
    {
        $this->clientService->deleteClient($id);
        return response()->json(['message' => 'Client Deleted Successfully']);
    }
}
