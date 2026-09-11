<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlayerResource;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PlayerController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players=Player::all();
        return  PlayerResource::collection($players);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
           'position' => 'required|string',
            'level' => 'required|integer',
            'points' => 'required|integer',
            'trustworthy' => 'required|integer',
        ]);
        $player=Player::create([
            'position'=>$request->position,
            'level'=>$request->level,
            'points'=>$request->points,
            'trustworthy'=>$request->trustworthy,
            'user_id'=>$request->user()->id
        ]);
        return response()->json([
            "message"=>"create the player with success",
            "player"=>new PlayerResource($player),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $player=Player::findOrFail($id);
       return new PlayerResource($player);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation=$request->validate([
            'position'=>"required",
            'level'=>"required",
            'points'=>"required",
            'trustworthy'=>"required",
        ]);
        $player=Player::findOrFail($id);
        $this->authorize('update',$player);
        $player->update($validation);
        return response()->json([
            "message"=>"update the player with success",
            "player"=>new PlayerResource($player),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $player=Player::findOrFail($id);
        $this->authorize('delete',$player);
       $player->delete();
       return response()->json([
            "message"=>"delete the player with success",
        ]);
    }
}
