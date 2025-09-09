<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['content'];

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class);
    }
}
