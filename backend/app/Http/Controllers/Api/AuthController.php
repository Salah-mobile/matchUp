<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlayerResource;
use Illuminate\Http\Request;
use App\Services\AuthService;
class AuthController extends Controller
{
    public function register(Request $request,AuthService $authService)
    {
        $data=$request->validate([
            'name' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
        $result=$authService->RegisterService($data);
        return response()->json([
            "message"=>"create user with success",
            "token"=>$result["token"],
            "player"=>new PlayerResource($result["player"]),
            "user"=>new PlayerResource($result["user"]),
        ]);
    }
    public function login(Request $request,AuthService $authService)
    {
        $data=$request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);
        $result=$authService->LoginService($data);
        if(!$result){
            return response()->json([
                "error"=>"Invalid credentials",
            ]);
        }else{
            return response()->json([
                'response' => 'Login successfully',
                "token"=>$result["token"],
                "player"=>new PlayerResource($result["player"]),
                "user"=>new PlayerResource($result["user"]),
            ]);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "logout" => "success"
        ]);
    }
}
