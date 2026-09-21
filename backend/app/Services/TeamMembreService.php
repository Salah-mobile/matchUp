<?php
namespace App\Services;

use App\Models\TeamMember;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class TeamMembreService{
    use AuthorizesRequests;
    public function CreateTeamMembreService($data,$player){
                $this->authorize(
                    "create",
                    TeamMember::class
                );
            if (!$player) {
                  return [
                    "message"=>"found",
                  ];
            }
            if ($player->memberOfTeam) {
                return [
                    "message"=>"exist",
                ];
            }

            $membre = TeamMember::create([
                "team_id" =>$data["team_id"],
                "player_id" => $player->id,
                "joined_at" => now(),
                "grade" => $data["grade"],
            ]);
            return [
                "message"=>"success",
                "teamMember"=>$membre
            ];
    }
    public function updateTeamMembreService($validation,$id){
        $membre = TeamMember::findOrFail($id);
        $this->authorize(
            "update",
            $membre
        );
        $membre->update([
            "grade" => $validation["grade"],
        ]);
        return [
            "membre"=>$membre,
        ];
    }
    public function destroyTeamMembreService($id){
        $membre = TeamMember::findOrFail($id);

        $this->authorize(
            "delete",
            $membre
        );

        $membre->delete();
    }
}
