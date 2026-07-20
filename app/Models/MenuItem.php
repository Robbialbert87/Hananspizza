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
        'gofood_link',
        'grabfood_link',
        'shopeefood_link',
        'whatsapp_link',
    ];

    protected $casts = [
        'price' => 'integer',
        'old_price' => 'integer',
        'rating' => 'float',
        'reviews' => 'integer',
        'is_active' => 'boolean',
    ];
}
