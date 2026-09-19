<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        "id" => $this->id,
        "team_id" => $this->team_id,
        "player_id" => $this->player_id,
        "player" => [
            "id" => $this->player->id,
            "name" => $this->player->user->name,
            "lastname" => $this->player->user->lastname,
        ],
        "joined_at" => $this->joined_at,
        "grade" => $this->grade,
        ];
    }
}
