<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'brand_id',
        'client_name',
        'brand_name',
        'phone',
        'car_model',
        'plate_number',
        'chase_number',
        'motor',
        'car_counter',
        'car_color',
        'notes',
        'sub_total',
        'tax_rate',
        'tax_amount',
        'grand_total',
        'entry_date',
        'exit_date',
    ];

    protected $casts = [
        'entry_date' => 'date',
        'exit_date' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function spareParts(): HasMany
    {
        return $this->hasMany(BillSparePart::class);
    }

    public function labors(): HasMany
    {
        return $this->hasMany(BillLabor::class);
    }
}
