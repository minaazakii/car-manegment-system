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
use Illuminate\Http\Resources\Json\ResourceCollection;

class SparePartController extends Controller
{
    private SparePartService $sparePartService;

    public function __construct(SparePartService $sparePartService)
    {
        $this->sparePartService = $sparePartService;
    }

    public function index(): ResourceCollection
    {
        $paginated = (bool)request()->query('paginated', true);
        $size = request()->query('size', 10);
        $search = request()->query('searchValue', null);

        $spareParts = $this->sparePartService->getSpareParts($paginated, $size, $search);

        return SparePartResource::collection($spareParts);
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
