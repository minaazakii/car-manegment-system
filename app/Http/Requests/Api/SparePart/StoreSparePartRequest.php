<?php

namespace App\Http\Requests\Api\SparePart;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class StoreSparePartRequest extends FormRequest
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
            'car_type_id' => 'required|exists:car_types,id,deleted_at,NULL',
            'code' => 'required',
            'price' => 'required|numeric',
            'notes' => 'nullable',
            'stock' => 'nullable|numeric'
        ];
    }
}
