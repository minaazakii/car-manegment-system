<?php

namespace App\Services;

use App\Models\CarType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class CarTypeService
{
    public function __construct(private BrandService $brandService) {}

    public function getCarTypes($paginated = true, $size = 10, $search = null): Collection|LengthAwarePaginator
    {
        $query = CarType::query()->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%");
        });

        return  $paginated ? $query->paginate($size) : $query->get();
    }

    public function getSingleCarType($id): CarType
    {
        $carType = CarType::findOrFail($id);
        return $carType;
    }

    public function createCarType($data): CarType
    {
        $carType = CarType::create(['name' => $data['name']]);
        return $carType;
    }

    public function updateCarType($data, $id): CarType
    {
        $carType = CarType::findOrFail($id);
        $carType->update(['name' => $data['name']]);
        return $carType;
    }

    public function deleteCarType($id): void
    {
        CarType::findOrFail($id)->delete();
    }

    public function updateCarTypeBrands($carTypeId,  array $brands): CarType
    {
        $carType = $this->getSingleCarType($carTypeId);
        $carTypeBrandsIds = $carType->brands->pluck('id')->toArray();
        $brandsToDelete = $carTypeBrandsIds;
        foreach ($brands as $brand) {

            if (!isset($brand['id'])) {
                $carType->brands()->create($brand);
                continue;
            }

            //Update the brand if it's in the request
            $this->brandService->updateBrand($brand, $brand['id']);

            //Remove the brand from the brandsToDelete array if it's in the request
            $brandsToDelete = array_diff($brandsToDelete, [$brand['id']]);
        }

        //Delete brands that are not in the request
        if ($brandsToDelete) {
            foreach ($brandsToDelete as $brandId) {
                $this->brandService->deleteBrand($brandId);
            }
        }

        return $this->getSingleCarType($carTypeId);
    }
}
