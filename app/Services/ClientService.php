<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ClientService
{
    public function getClients($paginated = true, $size = 10, $search = null): Collection | LengthAwarePaginator
    {

        $query = Client::query()->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%")
                ->orWhere('phone', 'like', "%$search%");
        });
        return $paginated ? $query->paginate($size) : $query->get();
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
