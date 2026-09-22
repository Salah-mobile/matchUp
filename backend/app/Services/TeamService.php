<?php
namespace App\Services;

use App\Models\FootballMatch;
use App\Models\MatchPlayer;
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
   public function QuitTeamService($player, $team)
    {
        $membre = $player->memberOfteam;

        if (!$membre) {
            return [
                "error" => "The player has no team"
            ];
        }

        if ($membre->team_id != $team->id) {
            return [
                "error" => "The player does not belong to this team"
            ];
        }

        if ($membre->grade == "captain") {

            $newCaptain = TeamMember::where(
                "team_id",
                $team->id
            )
            ->where(
                "player_id",
                "!=",
                $player->id
            )
            ->first();

            if ($newCaptain) {
                $newCaptain->update([
                    "grade" => "captain"
                ]);
            }
        }
        $openMatches = FootballMatch::where(
            "status",
            "open"
        )->get();
        foreach ($openMatches as $match) {
            MatchPlayer::where(
                "player_id",
                $player->id
            )
            ->where(
                "match_id",
                $match->id
            )
            ->delete();
        }
        $membre->delete();
        return [
            "message" => "The player quit the team"
        ];
    }
}
