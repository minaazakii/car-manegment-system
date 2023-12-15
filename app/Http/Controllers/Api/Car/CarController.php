<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Resources\CarResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Car\StoreCarRequest;
use App\Http\Requests\Api\Car\UpdateCarRequest;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();

        return response()->json(['cars' => CarResource::collection($cars)]);
    }

    public function show($id)
    {
        $car = Car::findOrFail($id);
        return response()->json(['car' => new CarResource($car)]);
    }

    public function store(StoreCarRequest $request)
    {
        $car = Car::create($request->validated());
        return response()->json(
            [
                'message' => 'Car Created Successfully',
                'car' => new CarResource($car)
            ]
        );
    }

    public function update(UpdateCarRequest $request, $id)
    {
        $car = Car::findOrFail($id);
        $car->update($request->validated());
        return response()->json(
            [
                'message' => 'Car Updated Successfully',
                'car' => new CarResource($car)
            ]
        );
    }

    public function destroy($id)
    {
        Car::findOrFail($id)->delete();
        return response()->json(['message' => 'Car Deleted Successfully']);
    }
}
