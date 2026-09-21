<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use App\Http\Resources\TeamResource;
use App\Models\TeamMember;
use App\Services\TeamService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class TeamController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
     $teams=Team::all();
     return TeamResource::collection($teams);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,TeamService $teamService)
    {
        $data=$request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'logo' => 'required|string',
        ]);
        $player=$request->user()->player;
        $result=$teamService->createTeamService($player,$data);
        if($result["message"]==="found"){
            return response()->json([
                'message' => 'Player not found'
            ]);
        }else if($result["message"]==="exist"){
             return response()->json([
                'message' => 'You are already a member of a team'
            ]);
        }else{
            return response()->json([
                'message' => 'Team created successfully',
                'team' => new TeamResource($result["team"]),
            ]);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team=Team::findorFail($id);
        return new TeamResource($team);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id,TeamService $teamService)
    {
        $validation=$request->validate([
            'name' => 'string',
            'description' => 'string',
            'logo' => 'string',
            'classment' => 'integer',
        ]);
        $result=$teamService->updateTeamService($validation,$id);
        return response()->json([
            "message"=>"team update with success",
            "team"=>new TeamResource($result["team"]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id,TeamService $teamService)
    {
        $teamService->deleteTeamService($id);
        return response()->json([
            "message"=>"team delete with success",
        ]);
    }
}
