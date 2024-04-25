<?php

namespace App\Http\Requests\Api\SparePart;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSparePartRequest extends FormRequest
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
            'name' => 'required',
            'type' => 'required|in:material,spare_part',
            'car_type_id' => 'required|exists:car_types,id,deleted_at,NULL',
            'code' => 'required',
            'price' => 'required|numeric',
            'notes' => 'nullable',
            'stock' => 'nullable|numeric'
        ];
    }

    public function messages(): array
    {
        return [
            'type.in' => 'type must be material or spare_part',
        ];
    }
}
