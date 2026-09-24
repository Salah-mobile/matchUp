<?php
namespace App\Services;

use App\Http\Resources\FootballMatchResource;
use App\Models\FootballMatch;
use App\Models\MatchPlayer;
use App\Models\TeamMember;
use Carbon\Carbon;

class FootballMtachService
{
    public function indexService($player)
    {
        if (!$player) {
            return [
                "error" => "'Player not found'",
            ];
        }
        $teamMember = $player->memberOfteam;
        if (!$teamMember) {
            return [
                "error" => "You are not a member of a team",
            ];
        }
        $teamId = $teamMember->team_id;
        $isCaptain = $teamMember->grade === 'captain';
        $matches = FootballMatch::with([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player.user',
            'players.team'
        ])
        ->latest()
        ->get();
        $filteredMatches = [];
        foreach ($matches as $match) {
            if (
                $match->team1 == $teamId ||
                $match->team2 == $teamId
            ) {
                $filteredMatches[] = $match;
                continue;
            }
            if (
                $isCaptain &&
                $match->status === 'open' &&
                $match->team2 === null
            ) {
                $filteredMatches[] = $match;
            }
        }
        return [
            "filteredMatches"=>$filteredMatches,
        ];
    }
    public function createFootballMatchService($player, $data)
    {
        if (!$player) {
            return [
                "error" => "Player not found",
            ];
        }
        $teamMember = $player->memberOfteam;
        if (!$teamMember) {
            return [
                "error" => "You must be a member of a team",
            ];
        }
        if ($teamMember->grade !== 'captain') {
            return [
                "error" => "Only the captain can create a match",
            ];
        }
        $membersCount = TeamMember::where(
            'team_id',
            $teamMember->team_id
        )->count();
        if ($membersCount < 7) {
            return [
                "error" => "Your team has {$membersCount} members. You need at least 7 members to create a match."
            ];
        }
        $requestedDateTime = Carbon::parse(
            $data["day"] . ' ' . $data["time"]
        );
        $existingMatches = FootballMatch::where(
            'place_id',
            $data["place_id"]
        )
        ->whereIn('status', ['open', 'full'])
        ->get();
        foreach ($existingMatches as $existingMatch) {
            $existingDateTime = Carbon::parse(
                $existingMatch->day . ' ' . $existingMatch->time
            );
            $difference = $requestedDateTime->diffInMinutes(
                $existingDateTime,
                true
            );
            if ($difference <= 60) {
                return [
                    "error" => "This place is already reserved within one hour of this time."
                ];
            }
        }
        $match = FootballMatch::create([
            'day' => $data["day"],
            'time' => $data["time"],
            'place_id' => $data["place_id"],
            'team1' => $teamMember->team_id,
            'team2' => null,
            'winner' => null,
            'status' => 'open',
        ]);
        return [
            "match" => $match
        ];
    }
    public function joindFootballMatchService($match, $player)
    {
        if ($match->status !== 'open') {
            return [
                "error" => "This match is not available for joining."
            ];
        }
        if (!$player) {
            return [
                "error" => "Player not found"
            ];
        }
        $teamMember = $player->memberOfteam;
        if (!$teamMember) {
            return [
                "error" => "You must be a member of a team."
            ];
        }
        if ($teamMember->grade !== 'captain') {
            return [
                "error" => "Only the captain can join a team to a match."
            ];
        }
        $teamId = $teamMember->team_id;
        if ($teamId == $match->team1) {
            return [
                "error" => "Your team already created this match."
            ];
        }
        if ($match->team2 !== null) {
            return [
                "error" => "Another team already joined this match."
            ];
        }
        $membersCount = TeamMember::where(
            'team_id',
            $teamId
        )->count();
        if ($membersCount < 7) {
            return [
                "error" => "Your team must have at least 7 members."
            ];
        }
        $match->update([
            'team2' => $teamId,
        ]);
        return [
            "match" => $match
        ];
    }
    public function joinPlayerFootballMatchService($match, $player)
    {
        if ($match->status !== 'open') {
            return [
                "error" => "This match is not available."
            ];
        }

        if (!$player) {
            return [
                "error" => "Player not found"
            ];
        }
        if($player->trustworthy==0){
            return [
                "error"=>"you can not joind the match if your trustworthy minus or equal 0"
            ];
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember) {
            return [
                "error" => "You must be a member of a team."
            ];
        }

        $teamId = $teamMember->team_id;

        if (
            $teamId != $match->team1 &&
            $teamId != $match->team2
        ) {
            return [
                "error" => "Your team is not part of this match."
            ];
        }

        $alreadyJoined = MatchPlayer::where(
            'match_id',
            $match->id
        )
        ->where('player_id', $player->id)
        ->exists();

        if ($alreadyJoined) {
            return [
                "error" => "You already joined this match."
            ];
        }

        $teamPlayersCount = MatchPlayer::where(
            'match_id',
            $match->id
        )
        ->where('team_id', $teamId)
        ->count();

        if ($teamPlayersCount >= 5) {
            return [
                "error" => "Your team already has 5 players in this match."
            ];
        }

        $totalPlayers = MatchPlayer::where(
            'match_id',
            $match->id
        )->count();

        if ($totalPlayers >= 10) {
            return [
                "error" => "This match already has 10 players."
            ];
        }

        MatchPlayer::create([
            'match_id' => $match->id,
            'player_id' => $player->id,
            'team_id' => $teamId,
        ]);

        $team1Players = MatchPlayer::where(
            'match_id',
            $match->id
        )
        ->where('team_id', $match->team1)
        ->count();

        $team2Players = 0;

        if ($match->team2) {
            $team2Players = MatchPlayer::where(
                'match_id',
                $match->id
            )
            ->where('team_id', $match->team2)
            ->count();
        }

        if (
            $team1Players == 5 &&
            $team2Players == 5
        ) {
            $match->update([
                'status' => 'full'
            ]);
        }

        return [
            "match" => $match
        ];
    }
    public function UpdateFootballMatchService($match, $player, $validation)
    {
        if (!$player) {
            return [
                "error" => "Player not found"
            ];
        }

        $teamMember = $player->memberOfteam;

        if (
            !$teamMember ||
            $teamMember->team_id != $match->team1
        ) {
            return [
                "error" => "You are not allowed to update this match"
            ];
        }

        if ($teamMember->grade !== 'captain') {
            return [
                "error" => "Only the captain can update the match"
            ];
        }

        if ($match->team2 !== null) {
            return [
                "error" => "You cannot update the match after another team joined"
            ];
        }

        $requestedDateTime = Carbon::parse(
            $validation["day"] . ' ' . $validation["time"]
        );

        $existingMatches = FootballMatch::where(
            'place_id',
            $validation["place_id"]
        )
        ->where('id', '!=', $match->id)
        ->whereIn('status', ['open', 'full'])
        ->get();

        foreach ($existingMatches as $existingMatch) {

            $existingDateTime = Carbon::parse(
                $existingMatch->day . ' ' . $existingMatch->time
            );

            $difference = $requestedDateTime->diffInMinutes(
                $existingDateTime,
                true
            );

            if ($difference <= 60) {
                return [
                    "error" => "This place is already reserved within one hour of this time."
                ];
            }
        }

        $match->update($validation);

        return [
            "match" => $match
        ];
    }
    public function destroyService($match,$player){
         if (!$player) {
            return [
                "error"=>"Player not found"
            ];
        }
        $teamMember = $player->memberOfteam;
        if (
            !$teamMember ||
            $teamMember->team_id != $match->team1
        ) {
            return [
                "error"=> 'You are not allowed to delete this match'
            ];
        }
        if ($teamMember->grade !== 'captain') {
            return [
                "error"=>"'Only the captain can delete this match'"
            ];
        }
        if ($match->team2 !== null) {
            return [
                "error"=>'You cannot delete the match after another team joined'
            ];
        }
        $match->delete();
        return [
            "success"=>'Match deleted successfully'
        ];

    }
    public function finishService($match, $player, $result)
    {
        if ($match->status === 'finished') {
            return [
                "error" => "This match is already finished."
            ];
        }
        if ($match->status === 'cancelled') {
            return [
                "error" => "This match is cancelled."
            ];
        }
        if (!$match->team2) {
            return [
                "error" => "This match does not have a second team."
            ];
        }
        if ($match->status !== 'full') {
            return [
                "error" => "Both teams must have 5 players before finishing the match."
            ];
        }
        if (!$player) {
            return [
                "error" => "Player not found."
            ];
        }
        $teamMember = $player->memberOfteam;
        if (!$teamMember) {
            return [
                "error" => "You are not a member of a team."
            ];
        }
        if (
            $teamMember->grade !== 'captain' ||
            (
                $teamMember->team_id != $match->team1 &&
                $teamMember->team_id != $match->team2
            )
        ) {
            return [
                "error" => "Only the captain of one of the two teams can finish this match."
            ];
        }
        $matchDateTime = Carbon::parse(
            $match->day . ' ' . $match->time
        );
        $finishTime = $matchDateTime->addHour();
        $currentTime = now();
        if ($currentTime < $finishTime) {
            return [
                "error" => "You can finish the match after one hour from its start."
            ];
        }
        if ($result["result"] === "draw") {

            $winner = null;
        } elseif ($result["result"] === "win") {
            $winner = $teamMember->team_id;
        } else {
            if ($teamMember->team_id == $match->team1) {
                $winner = $match->team2;
            } else {
                $winner = $match->team1;
            }
        }
        $match->update([
            "winner" => $winner,
            "status" => "finished",
        ]);
        return [
            "match" => $match
        ];
    }
    public function QuitMatchService($match, $player){
        if($match->status=="finish"){
            return[
                "error"=>"you can not quit a finish match"
            ];
        }else{
           $matchMembre=MatchPlayer::where('match_id',"=",$match->id)->where("player_id","=",$player->id)->first();
           $player->update([
            "trustworthy"=>$player->trustrustworthy-20
           ]);
           $matchMembre->delete();
           return [
            "message"=>"delete the match membre with success"
           ];
        }

    }
}
