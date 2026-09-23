<?php
namespace App\Services;
use App\Models\TeamMember;

class InvitationService{
    public function acceptInvitationService($invitation){
        if ($invitation->status !== 'pending') {
            return [
                "error"=>"This invitation is no longer pending."
            ];
        }

        $player = $invitation->player;
        if ($player->memberOfteam()->exists()) {
            return [
                "error"=>'This player is already a member of a team.'
            ];
        }
        $teamMember = TeamMember::create([
            'team_id' => $invitation->team_id,
            'player_id' => $invitation->player_id,
            'grade' => 'member',
            'joined_at' => now(),
        ]);
        $invitation->update([
            'status' => 'accepted',
        ]);
        return [
            "data"=>$teamMember
        ];
    }

}
