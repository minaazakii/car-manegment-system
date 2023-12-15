<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class FileHelper
{
    public static function  uploadFile($file,$folder)
    {
        $fileName = time().'_'.$file->getClientOriginalName();

        Storage::disk('public')->putFileAs($folder,$file,$fileName);

        return Storage::disk('public')->url($folder.'/'.$fileName);
    }

    public static function updateFile($newFile,$oldFile,$folder)
    {
        if(Storage::disk('public')->exists($folder . '/' . basename($oldFile)))
        {
            Storage::disk('public')->delete($folder . '/' . basename($oldFile));
            return self::uploadFile($newFile,'lesson_imgs');
        }
    }
}
