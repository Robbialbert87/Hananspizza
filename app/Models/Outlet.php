<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'hours',
        'map_link',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
