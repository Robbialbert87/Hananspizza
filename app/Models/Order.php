<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_id',
        'customer_id',
        'customer_name',
        'items',
        'total',
        'status',
        'platform',
    ];

    protected $casts = [
        'total' => 'integer',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
