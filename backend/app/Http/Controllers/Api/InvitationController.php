<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use App\Models\Player;
use App\Models\TeamMember;
use App\Services\InvitationService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class InvitationController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invitations=Invitation::with(["team","player"])->get();
        return response()->json([
            "data"=>InvitationResource::collection($invitations)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request,InvitationService $invitationService)
    {
        $validated = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'player_id' => 'required|exists:players,id',
            'type' => 'required|in:team_invitation,join_request',
        ]);

        if ($validated['type'] === 'team_invitation') {

            $this->authorize(
                'createTeamInvitation',
                [Invitation::class, $validated['team_id']]
            );

            $player =Player::find($validated['player_id']);
            if ($player->id === $request->user()->player->id) {
                return response()->json([
                    'message' => 'You cannot invite yourself.'
                ],);
              }

            if ($player->memberOfteam()->exists()) {
                return response()->json([
                    'message' => 'This player is already a member of a team.'
                ],);
            }
        }

        if ($validated['type'] === 'join_request') {

            $this->authorize(
                'createJoinRequest',
                Invitation::class
            );

            $existingInvitation = Invitation::where('team_id', $validated['team_id'])
                ->where('player_id', $request->user()->player->id)
                ->where('type', 'join_request')
                ->where('status', 'pending')
                ->exists();

            if ($existingInvitation) {
                return response()->json([
                    'message' => 'You already have a pending join request for this team.'
                ], );
}
        }

        $invitation = Invitation::create([
            'team_id' => $validated['team_id'],
            'player_id' => $validated['player_id'],
            'type' => $validated['type'],
            'status' => 'pending',
            'send_at' => now(),
        ]);

        return response()->json([
            'message' => 'Invitation created successfully',
            'data' => $invitation
        ],);
    }
    public function accept($invitation_id,InvitationService $invitationService)
    {
        $invitation=Invitation::findOrFail($invitation_id);
        $this->authorize('accept', $invitation);
        $result=$invitationService->acceptInvitationService($invitation);
        if(isset($result["error"])){
            return response()->json([
                   'message' =>$result["error"]
               ],);
        }
        return response()->json([
            'message' => 'Invitation accepted successfully.',
            'data' => $result["data"]
        ]);
    }

    
    public function reject(Invitation $invitation)
    {
        $this->authorize('reject', $invitation);

        if ($invitation->status !== 'pending') {
            return response()->json([
                'message' => 'This invitation is no longer pending.'
            ], 422);
        }

        $invitation->update([
            'status' => 'rejected',
        ]);

        return response()->json([
            'message' => 'Invitation rejected successfully.',
            'data' => $invitation
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
