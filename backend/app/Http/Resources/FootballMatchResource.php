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

            'team1' => $this->team1 ? [
                'id' => $this->team1->id,
                'name' => $this->team1->name,
            ] : null,

            'team2' => $this->team2 ? [
                'id' => $this->team2->id,
                'name' => $this->team2->name,
            ] : null,

            'winner' => $this->winner ? [
                'id' => $this->winner->id,
                'name' => $this->winner->name,
            ] : null,

            'created_at' => $this->created_at,
        ];
    }
}
