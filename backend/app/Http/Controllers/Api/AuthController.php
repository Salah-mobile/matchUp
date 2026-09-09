<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
         $request->validate([
            'name'=>'required|string',
            'lastname'=>'required|string',
            'email'=>'required|email',
            'password'=>'required|min:8'
         ]);
         $user=User::create([
              "name"=>$request->name,
              "lastname"=>$request->name,
              "email"=>$request->email,
              "password"=>$request->password,
         ]);
         $token=$user->createToken("auth_tocken")->plainTextToken;
         return response()->json([
            "reponse"=>"create user with success",
            "user"=>$user,
            "token"=>$token
         ]);
    }
    public function login(Request $request){
        $request->validate([
            "email"=>"required|email",
            "password"=>"required",
        ]);
        $user=User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){
             return Response()->json(["ereur"=>'Invalid credentials']);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'response' => 'Login successfully',
            'user' => $user,
            'token' => $token
        ]);

    }
    
}
