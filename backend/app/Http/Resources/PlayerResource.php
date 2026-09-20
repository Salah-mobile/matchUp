<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlayerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'position' => $this->position,
            'level' => $this->level,
            'points' => $this->points,
            'trustworthy' => $this->trustworthy,
            'user_id' => $this->user_id,

            'team_id' => $this->memberOfteam?->team_id,

            'grade' => $this->memberOfteam?->grade,
        ];
    }
}
