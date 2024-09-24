<?php

namespace App\Helpers;

use Illuminate\Contracts\Validation\Validator;

class ErrorHelper
{
    public static function JsonFormat(Validator $validator)
    {
        //dd(self::flattenArray($validator->errors()));
        $response = response()->json([
            'message' => 'Validation Error',
            'errors' => self::flattenArray($validator->errors()->toArray()),
        ], 422);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }

    private static function flattenArray($errors): array
    {
        $flatArray = [];

        foreach ($errors as $error) {
            if (is_array($error)) {
                $flatArray = array_merge($flatArray, self::flattenArray($error));
            } else {
                $flatArray[] = $error;
            }
        }
        return $flatArray;
    }
}
