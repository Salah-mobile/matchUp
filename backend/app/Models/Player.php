<?php

namespace App\Models;
use  App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Player extends Model
{
     protected $fillable=[
        'position',
        'level',
        'points',
        'trustworthy',
        'user_id'
     ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function teamAscaptain(){
        return $this->hasOne(Team::class,"captain");
    }
    public function memberOfteam(){
        return $this->hasOne(TeamMember::class);
    }
}
