<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Condition extends Model
{
    protected $fillable = ['content'];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
}
