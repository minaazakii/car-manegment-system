<?php

namespace App\Http\Controllers\Api\Client;

use App\Enums\ResponseCode;
use App\Services\CarService;
use Illuminate\Http\Request;
use App\Services\ClientService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Http\Requests\Api\Client\StoreClientRequest;
use App\Http\Requests\Api\Client\UpdateClientRequest;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClientController extends Controller
{
    private ClientService $clientService;

    private CarService $carService;

    public function __construct(ClientService $clientService, CarService $carService)
    {
        $this->clientService = $clientService;
        $this->carService = $carService;
    }

    public function index(): ResourceCollection
    {
        $paginated = (bool)request()->query('paginated', true);
        $size = request()->query('size', 10);
        $search = request()->query('searchValue', null);

        $clients = $this->clientService->getClients($paginated, $size, $search);
        return  ClientResource::collection($clients);
    }

    public function show($id)
    {
        $client = $this->clientService->getSingleClient($id);
        return response()->json(['client' => new ClientResource($client)]);
    }

    public function store(StoreClientRequest $request)
    {
        $client = $this->clientService->createClient($request->validated());

        foreach ($request->cars as $car) {
            $this->carService->createCar($car, $client);
        }

        return response()->json(
            [
                'message' => 'Client Created Successfully',
                'client' => new ClientResource($client)
            ]
        );
    }

    public function update(UpdateClientRequest $request, $id)
    {
        DB::beginTransaction();

        try {
            $client = $this->clientService->updateClient($request->validated(), $id);
            $this->clientService->updateClientCars($client, $request->validated()['cars']);
            DB::commit();

            return response()->json(
                [
                    'message' => 'Client Updated Successfully',
                    'client' => new ClientResource($client)
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

    public function destroy($id)
    {
        $this->clientService->deleteClient($id);
        return response()->json(['message' => 'Client Deleted Successfully']);
    }
}
