<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BillSparePart extends Model
{
    use HasFactory;

    protected $fillable = [
        'bill_id',
        'spare_part_id',
        'spare_part_name',
        'spare_part_code',
        'unit_price',
        'quantity',
        'grand_total',
    ];

    public function bill(): BelongsTo
    {
        return $this->belongsTo(Bill::class);
    }

    public function sparePart(): BelongsTo
    {
        return $this->belongsTo(SparePart::class);
    }
}
