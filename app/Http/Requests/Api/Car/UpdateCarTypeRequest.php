<?php

namespace App\Http\Requests\Api\Car;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCarTypeRequest extends FormRequest
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
            'name' => 'required|unique:car_types,name,' . $this->car_type,
            'brands' => 'required|array',
            'brands.*.id' => 'nullable|exists:brands,id',
            'brands.*.name' => 'required',
        ];
    }
}
