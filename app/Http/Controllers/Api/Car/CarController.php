<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\Car;
use App\Services\CarService;
use App\Http\Resources\CarResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Car\StoreCarRequest;
use App\Http\Requests\Api\Car\UpdateCarRequest;
use Illuminate\Http\JsonResponse;

class CarController extends Controller
{
    private $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }
    public function index(): JsonResponse
    {
        $cars = $this->carService->getCars();

        return response()->json(['cars' => CarResource::collection($cars)]);
    }

    public function show($id):JsonResponse
    {
        $car = $this->carService->getSingleCar($id);
        return response()->json(['car' => new CarResource($car)]);
    }

    public function store(StoreCarRequest $request): JsonResponse
    {
        $car = $this->carService->createCar($request->validated());
        return response()->json(
            [
                'message' => 'Car Created Successfully',
                'car' => new CarResource($car)
            ]
        );
    }

    public function update(UpdateCarRequest $request, $id): JsonResponse
    {
        $car = $this->carService->updateCar($request->validated(), $id);
        return response()->json(
            [
                'message' => 'Car Updated Successfully',
                'car' => new CarResource($car)
            ]
        );
    }

    public function destroy($id): JsonResponse
    {
        $this->carService->deleteCar($id);
        return response()->json(['message' => 'Car Deleted Successfully']);
    }
}
