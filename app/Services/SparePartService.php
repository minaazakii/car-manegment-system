<?php

namespace App\Services;

use App\Models\SparePart;
use App\Enums\SparePartType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class SparePartService
{
    public function getSpareParts($paginated = true, $size = 10): Collection | LengthAwarePaginator
    {
        $types = array_column(SparePartType::cases(), 'value');

        $spareParts = SparePart::query()
            ->when(in_array(request()->query('type'), $types), function ($query, $name) {
                return $query->where('type', request()->query('type'));
            });

        return $paginated ? $spareParts->paginate($size) : $spareParts->get();
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
