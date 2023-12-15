<?php

namespace App\Http\Requests\Api\User;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'phone' => 'required|unique:users,phone|numeric'
        ];
    }
}
