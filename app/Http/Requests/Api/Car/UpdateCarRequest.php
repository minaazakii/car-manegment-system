<?php

namespace App\Http\Requests\Api\Car;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        ErrorHelper::JsonFormat($validator);
    }

    public function rules(): array
    {
        return [
            'make' => 'required',
            'model' => 'required',
            'user_id' => 'required|exists:users,id,deleted_at,NULL',
            'car_type_id' => 'required|exists:car_types,id,deleted_at,NULL',
            'plate_number' => 'required|unique:cars,plate_number,' . $this->car,
            'chase_number' => 'required',
            'color' => 'nullable',
            'motor_number' => 'required',
            'entry_date' => 'required|date',
            'exit_date' => 'required|date|after_or_equal:entry_date',
        ];
    }
}
