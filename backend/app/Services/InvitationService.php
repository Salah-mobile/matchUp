<?php
namespace App\Services;
use App\Models\TeamMember;

class InvitationService{
    protected TeamMembreService $teamMembreService;

    public function __construct(TeamMembreService $teamMembreService)
    {
        $this->teamMembreService = $teamMembreService;
    }
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
        $result=$this->teamMembreService->CreateTeamMembreService([
            "team_id"=>$invitation->team_id,
            "grade"=>"membre"
            ],$player);
        if(isset($result["error"])){
            return [
                "error"=>$result["error"]
            ];
        }
        $invitation->update([
            'status' => 'accepted',
        ]);
        return [
            "data"=>$result["teamMember"]
        ];
    }
    public function rejectInvitationService($invitation){
        if ($invitation->status !== 'pending') {
            return [
                "error"=> 'This invitation is no longer pending.'
            ];
        }
        $invitation->update([
            'status' => 'rejected',
        ]);

       return [
        "invitation"=>$invitation
       ];
    }

}
