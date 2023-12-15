<?php

namespace App\Http\Controllers\Api\Car;

use App\Models\CarType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CarTypeResource;
use App\Http\Requests\Api\Car\StoreCarTypeRequest;
use App\Http\Requests\Api\Car\UpdateCarTypeRequest;

class CarTypeController extends Controller
{
    public function index()
    {
        $carTypes = CarType::all();

        return response()->json(['carTypes' => CarTypeResource::collection($carTypes)]);
    }

    public function show($id)
    {
        $carType = CarType::findOrFail($id);
        return response()->json(['carType' => new CarTypeResource($carType)]);
    }

    public function store(StoreCarTypeRequest $request)
    {
        $carType = CarType::create($request->validated());
        return response()->json(
            [
                'message' => 'CarType Created Successfully',
                'carType' => new CarTypeResource($carType)
            ]
        );
    }

    public function update(UpdateCarTypeRequest $request, $id)
    {
        $carType = CarType::findOrFail($id);
        $carType->update($request->validated());
        return response()->json(
            [
                'message' => 'CarType Updated Successfully',
                'carType' => new CarTypeResource($carType)
            ]
        );
    }

    public function destroy($id)
    {
        CarType::findOrFail($id)->delete();
        return response()->json(['message' => 'CarType Deleted Successfully']);
    }
}
