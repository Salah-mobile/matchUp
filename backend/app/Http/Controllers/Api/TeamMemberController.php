<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use App\Services\TeamMembreService;
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

    public function store(Request $request,TeamMembreService $teamMembreService)
    {
        $data=$request->validate([
            "team_id" => "required|exists:teams,id",
            "grade" => "required|string",
        ]);
        $this->authorize(
                    "create",
                    TeamMember::class
                );
        $player = $request->user()->player;
        $result=$teamMembreService->CreateTeamMembreService($data,$player);
        if(isset($result["error"])){
             return response()->json([
                       "message" => $result["error"]
            ]);
        }else{
            return response()->json([
                "message" => "Add member with success",
                "membre" => new TeamMemberResource($result["teamMember"]),
            ]);
        }
    }

    public function show(string $id)
    {
        $membre = TeamMember::findOrFail($id);

        return new TeamMemberResource($membre);
    }

    public function update(Request $request, string $id,TeamMembreService $teamMembreService)
    {
        $validation=$request->validate([
            "grade" => "required|string"
        ]);
        $membre = TeamMember::findOrFail($id);
        $this->authorize(
            "update",
            $membre
        );
        $result=$teamMembreService->updateTeamMembreService($validation,$membre);
        return response()->json([
            "message" => "The member updated successfully",
            "membre" => new TeamMemberResource($result["membre"]),
        ]);
    }
    public function destroy(string $id,TeamMembreService $teamMembreService)
    {
        $membre = TeamMember::findOrFail($id);
        $this->authorize(
            "delete",
            $membre
        );
        $teamMembreService->destroyTeamMembreService($membre);
        return response()->json([
            "message" => "The member deleted successfully",
        ]);
    }
}

