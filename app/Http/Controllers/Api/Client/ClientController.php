<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Client\StoreClientRequest;
use App\Http\Requests\Api\Client\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Services\CarService;
use App\Services\ClientService;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    private ClientService $clientService;

    private CarService $carService;

    public function __construct(ClientService $clientService,CarService $carService)
    {
        $this->clientService = $clientService;
        $this->carService = $carService;
    }

    public function index()
    {
        $clients = $this->clientService->getClients();
        return response()->json(['clients' => ClientResource::collection($clients)]);
    }

    public function show($id)
    {
        $client = $this->clientService->getSingleClient($id);
        return response()->json(['client' => new ClientResource($client)]);
    }

    public function store(StoreClientRequest $request)
    {
        $client = $this->clientService->createClient($request->validated());

        foreach($request->cars as $car){
            $this->carService->createCar($car,$client);
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
        $client = $this->clientService->updateClient($request->validated(), $id);
        return response()->json(
            [
                'message' => 'Client Updated Successfully',
                'client' => new ClientResource($client)
            ]
        );
    }

    public function destroy($id)
    {
        $this->clientService->deleteClient($id);
        return response()->json(['message' => 'Client Deleted Successfully']);
    }
    
}
