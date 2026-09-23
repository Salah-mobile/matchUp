<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "team_id"=>$this->team_id,
            "player_id"=>$this->player,
            "status"=>$this->status,
            "type"=>$this->type,
            "player"=>new PlayerResource($this->player),
            "team"=>new TeamResource($this->team),
        ];
    }
}
