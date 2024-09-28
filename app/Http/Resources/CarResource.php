<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
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
            'model' => $this->model,
            'carType' => new CarTypeResource($this->carType),
            'brand' => new BrandResource($this->brand),
            'plate_number' => $this->plate_number,
            'chase_number' => $this->chase_number,
            'color' => $this->color,
            'motor_number' => $this->motor_number,
        ];
    }
}
