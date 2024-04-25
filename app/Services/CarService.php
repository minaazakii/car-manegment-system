<?php

namespace App\Services;

use App\Models\Car;
use Illuminate\Database\Eloquent\Collection;

class CarService
{

    public function getCars(): Collection
    {
        $cars = Car::all();
        return $cars;
    }

    public function createCar($data): Car
    {
        $car = Car::create($data);
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
        $car->update($data);
        return $car;
    }

    public function deleteCar($id): void
    {
        Car::findOrFail($id)->delete();

    }

}
