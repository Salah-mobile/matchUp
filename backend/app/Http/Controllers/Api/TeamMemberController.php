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
       $teamMembers=TeamMember::all();
       return TeamMemberResource::collection($teamMembers);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function showByTeam(string $teamId){
       $teamMembers=TeamMember::where("team_id",$teamId)->get();
       return TeamMemberResource::collection($teamMembers);
    }
    public function store(Request $request)
    {
        $this->authorize("create",TeamMember::class);
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'grade' => 'required|string',
        ]);
        if ($request->user()->player->memberOfTeam){
            return response()->json([
                "message" => "You are already a member of a team"
            ], 422);
        }
        $membre=TeamMember::create([
            "team_id"=>$request->team_id,
            "player_id"=>$request->user()->player->id,
            "joined_at"=>now(),
            "grade"=>$request->grade,
        ]);
        return response()->json([
            "message"=>"add membre with success",
            "membre"=>new TeamMemberResource($membre),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $membre=TeamMember::findOrFail($id);
        return new TeamMemberResource($membre);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation=$request->validate([
          "grade"=>'required|string'
        ]);
        $membre=TeamMember::findOrFail($id);
        $this->authorize("update",$membre);
        $membre->update($validation);
        return response()->json([
          "message"=>"the membre update with success",
          "membre"=>new TeamMemberResource($membre),
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $membre=TeamMember::findOrFail($id);
        $this->authorize("delete",$membre);
        $membre->delete();
        return response()->json([
          "message"=>"the membre delete with success",
        ]);
    }
}
