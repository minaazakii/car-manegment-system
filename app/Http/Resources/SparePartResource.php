<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SparePartResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'car_type' => new CarTypeResource($this->carType),
            'code' => $this->code,
            'price' => $this->price,
            'notes' => $this->notes,
            'stock' => $this->stock
        ];
    }
}
