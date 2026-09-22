<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\FootballMatchResource;
use App\Models\FootballMatch;
use App\Models\TeamMember;
use App\Models\MatchPlayer;
use App\Services\FootballMtachService ;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FootballMatchController extends Controller
{
    public function index(Request $request,FootballMtachService $footballMatchService)
    {
        $player = $request->user()->player;
        $result=$footballMatchService->indexService($player);
        if($result['message']==='found'){
            return response()->json([
                  'message' => 'Player not found'
              ], 404);
        }elseif($result['message']==="member"){
            return response()->json([
                  'message' => 'You are not a member of a team'
              ], 422);
        }
        return FootballMatchResource::collection($result["filteredMatches"]);
    }

    public function store(Request $request,FootballMtachService $footballMatchService)
    {
        $data=$request->validate([
            'day' => 'required|date',
            'time' => 'required',
            'place_id' => 'required|exists:places,id',
        ]);
         $player = $request->user()->player;
        $result=$footballMatchService->createFootballMatchService($player,$data);
          if(isset($result["error"])){
            return response()->json([
                 "message"=>$result["error"],
            ]);
          }
          return response()->json([
            'message' => 'Match created successfully',
            'match' => new FootballMatchResource($result["match"]),
        ]);
    }

    public function show(string $id)
    {
        $match = FootballMatch::with([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player.user',
            'players.team'
        ])->findOrFail($id);
        return new FootballMatchResource($match);
    }

    public function join(Request $request, string $id,FootballMtachService $footballMatchService)
    {
        $match = FootballMatch::findOrFail($id);
        $player = $request->user()->player;
        $result=$footballMatchService->joindFootballMatchService($match,$player);
        if(isset($result["error"])){
            return response()->json([
                   'message' =>$result["error"]
               ]);
        }
        return response()->json([
            'message' => 'Your team joined the match successfully.',
            'match' => new FootballMatchResource($result["match"])
        ]);
    }

    public function joinPlayer(Request $request, string $id,FootballMtachService $footballMatchService)
    {
        $match = FootballMatch::findOrFail($id);
        $player = $request->user()->player;
        $result=$footballMatchService->joinPlayerFootballMatchService($match,$player);
        if(isset($result)){
            return response()->json([
                    'message' => $result["error"]
                ]);
        }
        return response()->json([
            'message' => 'You joined the match successfully.',
            'match' => new FootballMatchResource($result["match"]),
        ]);
    }
    public function update(Request $request, string $id,FootballMtachService $footballMatchService)
    {
        $match = FootballMatch::findOrFail($id);
        $player = $request->user()->player;
        $validation=$request->validate([
            'day' => 'required|date',
            'time' => 'required',
            'place_id' => 'required|exists:places,id',
        ]);
        $result=$footballMatchService->UpdateFootballMatchService($match,$player,$validation);
        if(isset($result["error"])){
            return response()->json([
                    'message' =>$result["error"]
                ]);
        }
        return response()->json([
            'message' => 'Match updated successfully',
            'match' => new FootballMatchResource($result["match"]),
        ]);
    }

    public function destroy(string $id,FootballMtachService $footballMatchService)
    {
        $match = FootballMatch::findOrFail($id);

        $player = request()->user()->player;
        $result=$footballMatchService->destroyService($match,$player);
        if(isset($result['error'])){
            return response()->json([
                    'message' =>$result["error"]
                ]);
        }
        return response()->json([
                    'message' =>$result["success"]
            ]);
    }

    public function myMatches(Request $request)
    {
        $player = $request->user()->player;
        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ]);
        }
        $matches = FootballMatch::with([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player.user',
            'players.team'
        ])
        ->whereHas('players', function ($query) use ($player) {
            $query->where('player_id', $player->id);
        })
        ->latest()
        ->get();
        return FootballMatchResource::collection($matches);
    }
    public function finish(Request $request, string $id,FootballMtachService $footballMatchService)
    {
        $result=$request->validate([
            'result' => 'required|in:win,draw,loss',
        ]);
        $match = FootballMatch::findOrFail($id);
        $player = $request->user()->player;
        $result=$footballMatchService->finishService($match,$player,$result);
        if(isset($result["error"])){
            return response()->json([
                   'message' => $result["error"]
               ]);
        }
        return response()->json([
            'message' => 'Match finished successfully.',
            'match' => new FootballMatchResource($result["match"]),
        ]);
    }
}
