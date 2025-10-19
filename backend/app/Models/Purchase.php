<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = [
    'user_id',
    'item_id',
    'amount',
    'payment',
    'zipcode',
    'address_line',
];
}
