<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\CarType;
use App\Services\CarTypeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CarTypeResource;
use App\Http\Requests\Api\Car\StoreCarTypeRequest;
use App\Http\Requests\Api\Car\UpdateCarTypeRequest;
use App\Http\Resources\CarTypeCollection;

class CarTypeController extends Controller
{
    private CarTypeService $carTypeService;

    public function __construct(CarTypeService $carTypeService)
    {
        $this->carTypeService = $carTypeService;
    }

    public function index(): JsonResponse
    {
        $paginated = (bool)request()->query('paginated', true);

        $size = request()->query('size', 10);
        $carTypes = $this->carTypeService->getCarTypes($paginated, $size);

        return response()->json([
            'carTypes' => $paginated
                ? new CarTypeCollection($carTypes)
                : CarTypeResource::collection($carTypes)
        ]);
    }

    public function show($id): JsonResponse
    {
        $carType = $this->carTypeService->getSingleCarType($id);
        return response()->json(['carType' => new CarTypeResource($carType)]);
    }

    public function store(StoreCarTypeRequest $request): JsonResponse
    {
        $carType = $this->carTypeService->createCarType($request->validated());
        return response()->json(
            [
                'message' => 'CarType Created Successfully',
                'carType' => new CarTypeResource($carType)
            ]
        );
    }

    public function update(UpdateCarTypeRequest $request, $id): JsonResponse
    {
        $carType = $this->carTypeService->updateCarType($request->validated(), $id);
        return response()->json(
            [
                'message' => 'CarType Updated Successfully',
                'carType' => new CarTypeResource($carType)
            ]
        );
    }

    public function destroy($id): JsonResponse
    {
        $this->carTypeService->deleteCarType($id);
        return response()->json(['message' => 'CarType Deleted Successfully']);
    }
}
