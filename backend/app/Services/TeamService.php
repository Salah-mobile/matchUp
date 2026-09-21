<?php
namespace App\Services;

use App\Models\Team;
use App\Models\TeamMember;

class TeamService{
    public function createTeamService($player,$data){
        if (!$player) {
            return[
                "message"=>"found"
            ];
        }

        if ($player->memberOfteam) {
            return [
                "message"=>"exist"
            ];
        }

        $team = Team::create([
            'name' => $data["name"],
            'description' =>$data["description"],
            'logo' => $data["logo"],
            'classment' => 0,
            'captain' => $player->id,
        ]);

        TeamMember::create([
            'team_id' => $team->id,
            'player_id' => $player->id,
            'joined_at' => now(),
            'grade' => 'captain',
        ]);
        return [
            "message"=>"success",
            "team"=>$team
        ];
    }

    public function updateTeamService($validation,$team){
        $team->update($validation);
        return [
            "team"=>$team
        ];
    }
    public function deleteTeamService($team){
        $team->delete();
    }
}
