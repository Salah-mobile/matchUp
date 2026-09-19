<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name',
        'price',
        'adress',
        'city',
    ];

    public function matchs()
    {
        return $this->hasMany(FootballMatch::class);
    }
}
