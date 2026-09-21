<?php
namespace App\Services;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Player;

class PlayerService{
    use AuthorizesRequests;
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
    public function updatePlayerService($validation,$id){
         $player=Player::findOrFail($id);
        $this->authorize('update',$player);
        $player->update($validation);
        return ["player"=>$player];
    }
    public function deletePlayerService($id){
        $player=Player::findOrFail($id);
        $this->authorize('delete',$player);
       $player->delete();
    }

}
