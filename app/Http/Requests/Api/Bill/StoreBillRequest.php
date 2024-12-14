<?php

namespace App\Http\Requests\Api\Bill;

use App\Helpers\ErrorHelper;
use Illuminate\Foundation\Http\FormRequest;

class StoreBillRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        ErrorHelper::JsonFormat($validator);
    }

    public function rules(): array
    {
        return [
            //Bill Main Data
            'client_id' => 'required|integer|exists:clients,id',
            'brand_id' => 'required|integer|exists:brands,id',
            'phone' => 'required|string|max:255',
            'car_model' => 'required|string|max:255',
            'plate_number' => 'required|string|max:255',
            'chase_number' => 'required|string|max:255',
            'motor' => 'required|string|max:255',
            'car_counter' => 'required|string|max:255',
            'car_color' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'sub_total' => 'required|numeric|min:0',
            'tax_rate' => 'required|numeric|min:0|max:100',
            'entry_date' => 'required|date',
            'exit_date' => 'required|date|after_or_equal:entry_date',

            //Bill Spare Parts Data (Optional Array)
            'bill_spare_parts' => 'nullable|array',
            'bill_spare_parts.*.spare_part_id' => 'required|integer|exists:spare_parts,id',
            'bill_spare_parts.*.unit_price' => 'required|numeric|min:0',
            'bill_spare_parts.*.quantity' => 'required|integer|min:1',

            //Bill Labors Data (Optional Array)
            'bill_labors' => 'nullable|array',
            'bill_labors.*.name' => 'required|string|max:255',
            'bill_labors.*.price' => 'required|numeric|min:0',
        ];
    }
}
