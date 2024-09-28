<?php

namespace App\Http\Controllers\Api\Car;

use App\Enums\ResponseCode;
use App\Models\CarType;
use App\Services\CarTypeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CarTypeResource;
use App\Http\Requests\Api\Car\StoreCarTypeRequest;
use App\Http\Requests\Api\Car\UpdateCarTypeRequest;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CarTypeCollection;
use App\Models\Brand;
use App\Services\BrandService;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\DB;

class CarTypeController extends Controller
{
    private CarTypeService $carTypeService;

    private BrandService $brandService;

    public function __construct(CarTypeService $carTypeService, BrandService $brandService)
    {
        $this->carTypeService = $carTypeService;
        $this->brandService = $brandService;
    }

    public function index(): JsonResponse
    {
        $paginated = (bool)request()->query('paginated', true);
        $size = request()->query('size', 10);
        $search = request()->query('searchValue', null);

        $carTypes = $this->carTypeService->getCarTypes($paginated, $size, $search);

        return response()->json([
            'carTypes' => $paginated
                ? new CarTypeCollection($carTypes)
                : ['data' => CarTypeResource::collection($carTypes)]
        ]);
    }

    public function getCarTypeBrands($typeId): ResourceCollection
    {
        $carType = CarType::with('brands')->findOrFail($typeId);
        return BrandResource::collection($carType->brands);
    }

    public function show($id): JsonResponse
    {
        $carType = $this->carTypeService->getSingleCarType($id);
        return response()->json(['carType' => new CarTypeResource($carType)]);
    }

    public function store(StoreCarTypeRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $carType = $this->carTypeService->createCarType($request->validated());
            $this->brandService->createBrand($carType, $request->validated()['brands']);
            DB::commit();
            return response()->json(
                [
                    'message' => 'CarType Created Successfully',
                    'carType' => new CarTypeResource($carType)
                ]
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(
                ['message' => 'Error Occured'],
                ResponseCode::INTERNAL_SERVER_ERROR->value
            );
        }
    }

    public function update(UpdateCarTypeRequest $request, $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $carType = $this->carTypeService->updateCarType($request->validated(), $id);
            $this->carTypeService->updateCarTypeBrands($id, $request->validated()['brands']);
            DB::commit();
            return response()->json(
                [
                    'message' => 'CarType Updated Successfully',
                    'carType' => new CarTypeResource($carType)
                ]
            );
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json(
                ['message' => 'Error Occured'],
                ResponseCode::INTERNAL_SERVER_ERROR->value
            );
        }
    }

    public function destroy($id): JsonResponse
    {
        $this->carTypeService->deleteCarType($id);
        return response()->json(['message' => 'CarType Deleted Successfully']);
    }
}
