<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlayerResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Models\Player;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);

        $user = User::create([
            "name" => $request->name,
            "lastname" => $request->lastname,
            "email" => $request->email,
            "password" => $request->password,
        ]);

       $player = Player::create([
            'position' => 'Unknown',
            'level' => 1,
            'points' => 0,
            'trustworthy' => 100,
            'user_id' => $user->id,
        ]);

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            "response" => "create user with success",
            "user" => new UserResource($user),
            "player" => new PlayerResource($player),
            "token" => $token
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "error" => "Invalid credentials"
            ], 401);
        }

        $player = Player::where("user_id", $user->id)->first();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'response' => 'Login successfully',
            'user' => new UserResource($user),
            'player' => $player,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "logout" => "success"
        ]);
    }
}
