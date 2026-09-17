<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Player;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
       $validation=$request->validate([
        "name"=>"string",
        "lastname"=>"string",
        "email"=>"email",
        "password"=>"string|min:8"
       ]);
       $user->update($validation);
       return response()->json([
        "message"=>"update with success",
        "user"=>$user
       ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $player=Player::with("user_id",$user->id);
        $user->delete();
        if($player){
            $player->delete();
        }
        return response()->json([
            "message"=>"delete the user with success",
        ]);
    }
}
