<?php

namespace App\Http\Requests\Api\Client;

use App\Models\Client;
use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'name' => 'required',
            'phone' => 'required|numeric|unique:clients,phone,' . $this->client,
            'cars' => 'array|required',
            'cars.*.id' => 'nullable|exists:cars,id',
            'cars.*.model' => 'required',
            'cars.*.car_type_id' => 'required|numeric|exists:car_types,id',
            'cars.*.brand_id' => 'required',
            'cars.*.plate_number' => 'nullable',
            'cars.*.chase_number' => 'nullable',
            'cars.*.color' => 'nullable',
            'cars.*.motor_number' => 'nullable',
        ];
    }
}
