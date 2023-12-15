<?php

namespace App\Helpers;

use Illuminate\Contracts\Validation\Validator;

class ErrorHelper
{
    public static function JsonFormat(Validator $validator)
    {
        $response = response()->json([
            'message' => 'Validation Error',
            'errors' => $validator->errors(),
        ], 422);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
