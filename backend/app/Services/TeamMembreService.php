<?php
namespace App\Services;

use App\Models\TeamMember;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class TeamMembreService{
    use AuthorizesRequests;
    public function CreateTeamMembreService($data,$player){
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
    public function updateTeamMembreService($validation,$membre){

        $membre->update([
            "grade" => $validation["grade"],
        ]);
        return [
            "membre"=>$membre,
        ];
    }
    public function destroyTeamMembreService($membre){


        $membre->delete();
    }
}
