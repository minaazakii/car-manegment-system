<?php

namespace App\Services;

use App\Models\CarType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class CarTypeService
{
    public function getCarTypes($paginated = true, $size = 10): Collection|LengthAwarePaginator
    {
        $carTypes = $paginated ? CarType::paginate($size) : CarType::get();
        return $carTypes;
    }

    public function getSingleCarType($id): CarType
    {
        $carType = CarType::findOrFail($id);
        return $carType;
    }

    public function createCarType($data): CarType
    {
        $carType = CarType::create($data);
        return $carType;
    }

    public function updateCarType($data, $id): CarType
    {
        $carType = CarType::findOrFail($id);
        $carType->update($data);
        return $carType;
    }

    public function deleteCarType($id): void
    {
        CarType::findOrFail($id)->delete();
    }
}
