<?php

namespace App\Services;

use App\Models\Car;
use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;

class CarService
{

    public function getCars(): Collection
    {
        $cars = Car::all();
        return $cars;
    }

    public function createCar($data, Client $client): Car
    {
        $car = Car::create([
            'client_id' => $client->id,
            'model' => $data['model'],
            'car_type_id' => $data['car_type_id'],
            'brand_id' => $data['brand_id'],
            'plate_number' => $data['plate_number'],
            'chase_number' => $data['chase_number'],
            'color' => $data['color'],
            'motor_number' => $data['motor_number'],
        ]);
        return $car;
    }

    public function getSingleCar($id): Car
    {
        $car = Car::findOrFail($id);
        return $car;
    }

    public function updateCar($data, $id): Car
    {
        $car = Car::findOrFail($id);
        $car->update([
            'model' => $data['model'],
            'car_type_id' => $data['car_type_id'],
            'brand_id' => $data['brand_id'],
            'plate_number' => $data['plate_number'],
            'chase_number' => $data['chase_number'],
            'color' => $data['color'],
            'motor_number' => $data['motor_number'],
        ]);
        return $car;
    }

    public function deleteCar($id): void
    {
        Car::findOrFail($id)->delete();
    }
}
