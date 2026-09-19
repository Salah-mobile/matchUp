<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FootballMatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'day' => $this->day,
            'time' => $this->time,
            'status' => $this->status,

            'place' => $this->place ? [
                'id' => $this->place->id,
                'name' => $this->place->name,
                'price' => $this->place->price,
                'adress' => $this->place->adress,
                'city' => $this->place->city,
            ] : null,

            'team1' => $this->firstTeam ? [
                'id' => $this->firstTeam->id,
                'name' => $this->firstTeam->name,
            ] : null,

            'team2' => $this->secondTeam ? [
                'id' => $this->secondTeam->id,
                'name' => $this->secondTeam->name,
            ] : null,

            'winner' => $this->winningTeam ? [
                'id' => $this->winningTeam->id,
                'name' => $this->winningTeam->name,
            ] : null,

            'created_at' => $this->created_at,
        ];
    }
}
