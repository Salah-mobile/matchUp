<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FootballMatch extends Model
{
    protected $table = 'matchs';

    protected $fillable = [
        'day',
        'time',
        'place_id',
        'team1',
        'team2',
        'winner',
        'status',
    ];
    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function team1()
    {
        return $this->belongsTo(Team::class, 'team1');
    }

    public function team2()
    {
        return $this->belongsTo(Team::class, 'team2');
    }

    public function winner()
    {
        return $this->belongsTo(Team::class, 'winner');
    }
}
