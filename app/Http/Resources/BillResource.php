<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
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
            'client_name' => $this->client_name,
            'brand' => $this->brand_name,
            'phone' => $this->phone,
            'car_model' => $this->car_model,
            'plate_number' => $this->plate_number,
            'chase_number' => $this->chase_number,
            'motor' => $this->motor,
            'car_counter' => $this->car_counter,
            'car_color' => $this->car_color,
            'notes' => $this->notes,
            'sub_total' => $this->sub_total,
            'tax_rate' => $this->tax_rate,
            'tax_amount' => $this->tax_amount,
            'grand_total' => $this->grand_total,
            'entry_date' => $this->entry_date->format('Y-m-d'),
            'exit_date' => $this->exit_date->format('Y-m-d'),
            'bill_spare_parts' => BillSparePartResource::collection($this->spareParts),
            'bill_labors' => BillLaborResource::collection($this->labors),
        ];
    }
}
