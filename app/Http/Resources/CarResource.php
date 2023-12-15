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
            'make' => $this->make,
            'model' => $this->model,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->user),
            'car_type_id' => $this->car_type_id,
            'carType' => new CarTypeResource($this->carType),
            'plate_number' => $this->plate_number,
            'chase_number' => $this->chase_number,
            'color' => $this->color,
            'motor_number' => $this->motor_number,
            'entry_date' => $this->entry_date,
            'exit_date' => $this->exit_date,
        ];
    }
}
