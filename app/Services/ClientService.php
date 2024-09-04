<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;

class ClientService
{
    public function getClients(): Collection
    {
        $clients = Client::all();
        return $clients;
    }

    public function getSingleClient($id): Client
    {
        $client = Client::findOrFail($id);
        return $client;
    }

    public function createClient($data): Client
    {
        $client = Client::create($data);
        return $client;
    }

    public function updateClient($data, $id): Client
    {
        $client = Client::findOrFail($id);
        $client->update($data);
        return $client;
    }

    public function deleteClient($id): void
    {
        Client::findOrFail($id)->delete();
    }
}
