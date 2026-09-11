<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        "team_id",
        "player_id",
        "joined_at",
        "grade"
    ];
    public function team(){
        return $this->belongsTo(Team::class);
    }
    public function player(){
        return $this->belongsTo(Player::class);
    }
}
