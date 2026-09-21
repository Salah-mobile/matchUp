<?php
namespace App\Services;
use App\Models\Player;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService{
    public function RegisterService($data){
            $user = User::create([
                "name" => $data["name"],
                "lastname" => $data["lastname"],
                "email" => $data["email"],
                "password" =>$data["password"],
            ]);
        $player = Player::create([
                'position' => 'Unknown',
                'level' => 1,
                'points' => 0,
                'trustworthy' => 100,
                'user_id' => $user->id,
            ]);
            $token = $user->createToken("auth_token")->plainTextToken;
            return [
                "user"=>$user,
                "player"=>$player,
                "token"=>$token,
            ];
    }
    public function LoginService($data){
        $user = User::where('email',$data["email"])->first();
        if (!$user || !Hash::check($data["password"], $user->password)) {
            return false ;
        }
        $player = Player::where("user_id", $user->id)->first();
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            "token"=>$token,
            "player"=>$player,
            "user"=>$user,
        ];

    }
}

