<?php

namespace App\Http\Controllers\Api\SparePart;

use App\Models\SparePart;
use App\Services\SparePartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SparePartResource;
use App\Http\Requests\Api\SparePart\StoreSparePartRequest;
use App\Http\Requests\Api\SparePart\UpdateSparePartRequest;

class SparePartController extends Controller
{
    private SparePartService $sparePartService;

    public function __construct(SparePartService $sparePartService)
    {
        $this->sparePartService = $sparePartService;
    }

    public function index(): JsonResponse
    {
        $spareParts = $this->sparePartService->getSpareParts();

        return response()->json(['spareParts' => SparePartResource::collection($spareParts)]);
    }

    public function show($id): JsonResponse
    {
        $sparePart = $this->sparePartService->getSingleSparePart($id);
        return response()->json(['sparePart' => new SparePartResource($sparePart)]);
    }

    public function store(StoreSparePartRequest $request): JsonResponse
    {
        $sparePart = $this->sparePartService->createSparePart($request->validated());
        return response()->json(
            [
                'message' => 'SparePart Created Successfully',
                'sparePart' => new SparePartResource($sparePart)
            ]
        );
    }

    public function update(UpdateSparePartRequest $request, $id): JsonResponse
    {
        $sparePart = $this->sparePartService->updateSparePart($request->validated(), $id);
        return response()->json(
            [
                'message' => 'SparePart Updated Successfully',
                'sparePart' => new SparePartResource($sparePart)
            ]
        );
    }

    public function destroy($id): JsonResponse
    {
        $this->sparePartService->deleteSparePart($id);
        return response()->json(['message' => 'SparePart Deleted Successfully']);
    }
}
