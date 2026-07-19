<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'old_price',
        'image',
        'badge',
        'rating',
        'reviews',
        'is_active',
    ];

    protected $casts = [
        'price' => 'integer',
        'old_price' => 'integer',
        'rating' => 'float',
        'reviews' => 'integer',
        'is_active' => 'boolean',
    ];
}
