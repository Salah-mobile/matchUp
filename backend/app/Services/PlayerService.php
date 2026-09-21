<?php
namespace App\Services;
use App\Models\Player;

class PlayerService{
    public function CreatePlayerService($data,$userId){
         $player=Player::create([
            'position'=>$data["position"],
            'level'=>$data["level"],
            'points'=>$data["points"],
            'trustworthy'=>$data["trustworthy"],
            'user_id'=>$userId,
        ]);
        return [
            "player"=>$player
        ];
    }
    public function updatePlayerService($validation,$player){
        $player->update($validation);
        return ["player"=>$player];
    }
    public function deletePlayerService($player){

       $player->delete();
    }

}
