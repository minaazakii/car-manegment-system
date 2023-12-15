<?php

namespace App\Http\Requests\Api\Car;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class StoreCarTypeRequest extends FormRequest
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
            'name' => 'required|unique:car_types,name'
        ];
    }
}
