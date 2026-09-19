<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FootballMatch extends Model
{
    protected $table = 'matchs';

    protected $fillable = [
        'day',
        'time',
        'place',
        'team1',
        'team2',
        'winner',
    ];

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
