<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SparePart extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    CONST TYPE_SPARE_PART = 'spare_part';
    CONST TYPE_MATERIAL = 'material';
    public function carType()
    {
        return $this->belongsTo(CarType::class);
    }
}
