<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillSparePartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'spare_part_name' => $this->spare_part_name,
            'spare_part_code' => $this->spare_part_code,
            'unit_price' => $this->unit_price,
            'quantity' => $this->quantity,
            'grand_total' => $this->grand_total,
        ];
    }
}
