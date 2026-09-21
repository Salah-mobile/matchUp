<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class FootballMatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $player = $request->user()?->player;

        $playerId = $player?->id;

        $myParticipation = null;

        if ($playerId) {
            $myParticipation = $this->players
                ->firstWhere('player_id', $playerId);
        }

        $myCurrentTeamId = $player?->memberOfteam?->team_id;

        $isCaptain = $player?->memberOfteam?->grade === 'captain';

        $canFinish = false;

        if ($player && $player->memberOfteam) {

            $teamMember = $player->memberOfteam;

            if (
                $teamMember->grade === 'captain' &&
                (
                    $teamMember->team_id == $this->team1 ||
                    $teamMember->team_id == $this->team2
                ) &&
                $this->status === 'full'
            ) {

                $matchDateTime = Carbon::parse(
                    $this->day . ' ' . $this->time
                );

                $canFinish = now()->gte(
                    $matchDateTime->copy()->addHour()
                );
            }
        }

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

            'players' => $this->players->map(function ($matchPlayer) {
                return [
                    'id' => $matchPlayer->id,

                    'player_id' => $matchPlayer->player_id,

                    'team_id' => $matchPlayer->team_id,

                    'player' => $matchPlayer->player ? [
                        'id' => $matchPlayer->player->id,
                        'name' => $matchPlayer->player->user->name ?? null,
                        'lastname' => $matchPlayer->player->user->lastname ?? null,
                    ] : null,
                ];
            }),

            'my_team_id' => $myParticipation?->team_id,

            'my_current_team_id' => $myCurrentTeamId,

            'is_joined' => $myParticipation ? true : false,

            'is_captain' => $isCaptain,

            'can_finish' => $canFinish,

            'created_at' => $this->created_at,
        ];
    }
}

