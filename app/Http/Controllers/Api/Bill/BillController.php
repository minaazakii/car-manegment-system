<?php

namespace App\Http\Controllers\Api\Bill;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Bill\StoreBillRequest;
use App\Http\Resources\BillResource;
use App\Models\Bill;
use App\Services\BillService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BillController extends Controller
{
    public function __construct(private BillService $billService) {}
    public function index()
    {
        return BillResource::collection(Bill::get());
    }

    public function store(StoreBillRequest $request)
    {
        try {
            $bill = $this->billService->storeBill($request->validated());
            return new BillResource($bill);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Bill $bill)
    {
        return new BillResource($bill);
    }

    public function destroy(Bill $bill)
    {
        $bill->delete();
        return response()->json([
            'message' => 'Bill deleted successfully',
        ]);
    }
}
