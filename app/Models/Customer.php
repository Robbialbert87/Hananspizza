<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'total_orders',
        'total_spent',
    ];

    protected $casts = [
        'total_orders' => 'integer',
        'total_spent' => 'integer',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
