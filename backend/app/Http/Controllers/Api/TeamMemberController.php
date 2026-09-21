<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $teamMembers = TeamMember::all();
        return TeamMemberResource::collection($teamMembers);
    }

    public function showByTeam(string $teamId)
    {
        $teamMembers = TeamMember::where(
            "team_id",
            $teamId
        )->get();

        return TeamMemberResource::collection($teamMembers);
    }

    public function store(Request $request)
    {
        $this->authorize(
            "create",
            TeamMember::class
        );

        $request->validate([
            "team_id" => "required|exists:teams,id",
            "grade" => "required|string",
        ]);

        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                "message" => "Player not found"
            ], 404);
        }

        if ($player->memberOfTeam) {
            return response()->json([
                "message" => "You are already a member of a team"
            ], 422);
        }

        $membre = TeamMember::create([
            "team_id" => $request->team_id,
            "player_id" => $player->id,
            "joined_at" => now(),
            "grade" => $request->grade,
        ]);

        return response()->json([
            "message" => "Add member with success",
            "membre" => new TeamMemberResource($membre),
        ], 201);
    }

    public function show(string $id)
    {
        $membre = TeamMember::findOrFail($id);

        return new TeamMemberResource($membre);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            "grade" => "required|string"
        ]);

        $membre = TeamMember::findOrFail($id);

        $this->authorize(
            "update",
            $membre
        );

        $membre->update([
            "grade" => $request->grade
        ]);

        return response()->json([
            "message" => "The member updated successfully",
            "membre" => new TeamMemberResource($membre),
        ]);
    }

    public function destroy(string $id)
    {
        $membre = TeamMember::findOrFail($id);

        $this->authorize(
            "delete",
            $membre
        );

        $membre->delete();

        return response()->json([
            "message" => "The member deleted successfully",
        ]);
    }
}

