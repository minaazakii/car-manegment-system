<?php

namespace App\Http\Controllers\Api\SparePart;

use App\Models\SparePart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SparePartResource;
use App\Http\Requests\Api\SparePart\StoreSparePartRequest;
use App\Http\Requests\Api\SparePart\UpdateSparePartRequest;

class SparePartController extends Controller
{
    public function index()
    {
        $spareParts = SparePart::all();

        return response()->json(['spareParts' => SparePartResource::collection($spareParts)]);
    }

    public function show($id)
    {
        $sparePart = SparePart::findOrFail($id);
        return response()->json(['sparePart' => new SparePartResource($sparePart)]);
    }

    public function store(StoreSparePartRequest $request)
    {
        $sparePart = SparePart::create($request->validated());
        return response()->json(
            [
                'message' => 'SparePart Created Successfully',
                'sparePart' => new SparePartResource($sparePart)
            ]
        );
    }

    public function update(UpdateSparePartRequest $request, $id)
    {
        $sparePart = SparePart::findOrFail($id);
        $sparePart->update($request->validated());
        return response()->json(
            [
                'message' => 'SparePart Updated Successfully',
                'sparePart' => new SparePartResource($sparePart)
            ]
        );
    }

    public function destroy($id)
    {
        SparePart::findOrFail($id)->delete();
        return response()->json(['message' => 'SparePart Deleted Successfully']);
    }
}
