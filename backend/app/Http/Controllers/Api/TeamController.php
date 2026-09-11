<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use App\Http\Resources\TeamResource;
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
    public function store(Request $request)
    {
      $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'logo' => 'required|string',
            'classment' => 'required|integer',
      ]);
      $team=Team::create([
        'name'=>$request->name,
        'description'=>$request->description,
        'logo'=>$request->logo,
        'classment'=>$request->classment,
        'captain'=>$request->user()->player->id,
      ]);
      return response()->json([
        "message"=>"team create with success",
        "team"=>new TeamResource($team),
      ]);
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
    public function update(Request $request, string $id)
    {
        $validation=$request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'logo' => 'required|string',
            'classment' => 'required|integer',
        ]);
        $team=Team::findorFail($id);
        $this->authorize("update",$team);
        $team->update($validation);
        return response()->json([
            "message"=>"team update with success",
            "team"=>new TeamResource($team),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team=Team::findorFail($id);
        $this->authorize("delete",$team);
        $team->delete();
        return response()->json([
            "message"=>"team delete with success",
        ]);
    }
}
