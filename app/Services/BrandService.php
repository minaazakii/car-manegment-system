<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\CarType;

class BrandService
{
    public function createBrand(CarType $carType, array $data): CarType
    {
        foreach ($data as $brand) {
            $carType->brands()->create($brand);
        }

        return $carType;
    }

    public function updateBrand(array $data, $id): void
    {
        $brand = Brand::findOrFail($id);
        $brand->update(['name' => $data['name']]);
    }

    public function deleteBrand($id): void
    {
        Brand::findOrFail($id)->delete();
    }
}
