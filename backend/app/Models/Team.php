<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'description',
        'logo',
        'classment',
        'captain'
    ];
    public function captain(){
        return $this->belongsTo(Player::class,"captain");
    }
}
