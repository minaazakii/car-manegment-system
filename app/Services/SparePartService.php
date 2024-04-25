<?php

namespace App\Services;

use App\Models\SparePart;
use Illuminate\Database\Eloquent\Collection;

class SparePartService
{
    public function getSpareParts(): Collection
    {
        $spareParts = SparePart::all();
        return $spareParts;
    }

    public function getSingleSparePart($id): SparePart
    {
        $sparePart = SparePart::findOrFail($id);
        return $sparePart;
    }

    public function createSparePart($data): SparePart
    {
        $sparePart = SparePart::create($data);
        return $sparePart;
    }

    public function updateSparePart($data, $id): SparePart
    {
        $sparePart = SparePart::findOrFail($id);
        $sparePart->update($data);
        return $sparePart;
    }

    public function deleteSparePart($id): void
    {
        SparePart::findOrFail($id)->delete();
    }
}
