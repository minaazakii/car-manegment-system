<?php

namespace App\Services;

use App\Models\CarType;
use Illuminate\Database\Eloquent\Collection;

class CarTypeService
{
    public function getCarTypes(): Collection
    {
        $carTypes = CarType::all();
        return $carTypes;
    }

    public function getSingleCarType($id) : CarType
    {
        $carType = CarType::findOrFail($id);
        return $carType;
    }

    public function createCarType($data) : CarType
    {
        $carType = CarType::create($data);
        return $carType;
    }

    public function updateCarType($data, $id) : CarType
    {
        $carType = CarType::findOrFail($id);
        $carType->update($data);
        return $carType;
    }

    public function deleteCarType($id) : void
    {
        CarType::findOrFail($id)->delete();
    }
}
