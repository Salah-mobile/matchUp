<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FootballMatchResource;
use App\Models\FootballMatch;
use App\Models\TeamMember;
use App\Models\MatchPlayer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FootballMatchController extends Controller
{
    public function index()
    {
        $matches = FootballMatch::with([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player',
            'players.team'
        ])->get();

        return FootballMatchResource::collection($matches);
    }

    public function store(Request $request)
    {
        $request->validate([
            'day' => 'required|date',
            'time' => 'required',
            'place_id' => 'required|exists:places,id',
        ]);

        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember) {
            return response()->json([
                'message' => 'You must be a member of a team'
            ], 422);
        }

        if ($teamMember->grade !== 'captain') {
            return response()->json([
                'message' => 'Only the captain can create a match'
            ], 403);
        }

        $membersCount = TeamMember::where(
            'team_id',
            $teamMember->team_id
        )->count();

        if ($membersCount < 7) {
            return response()->json([
                'message' => "Your team has {$membersCount} members. You need at least 7 members to create a match."
            ], 422);
        }

        $requestedDateTime = Carbon::parse(
            $request->day . ' ' . $request->time
        );

        $existingMatches = FootballMatch::where(
            'place_id',
            $request->place_id
        )
        ->whereIn('status', ['open', 'full'])
        ->get();

        foreach ($existingMatches as $existingMatch) {

            $existingDateTime = Carbon::parse(
                $existingMatch->day . ' ' . $existingMatch->time
            );

            $difference = abs(
                $requestedDateTime->diffInMinutes(
                    $existingDateTime,
                    false
                )
            );

            if ($difference <= 60) {
                return response()->json([
                    'message' => 'This place is already reserved within one hour of this time.'
                ], 422);
            }
        }

        $match = FootballMatch::create([
            'day' => $request->day,
            'time' => $request->time,
            'place_id' => $request->place_id,
            'team1' => $teamMember->team_id,
            'status' => 'open',
        ]);

        $match->load([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player',
            'players.team'
        ]);

        return response()->json([
            'message' => 'Match created successfully',
            'match' => new FootballMatchResource($match),
        ], 201);
    }

    public function show(string $id)
    {
        $match = FootballMatch::with([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player',
            'players.team'
        ])->findOrFail($id);

        return new FootballMatchResource($match);
    }

    public function join(Request $request, string $id)
    {
        $match = FootballMatch::findOrFail($id);

        if ($match->status !== 'open') {
            return response()->json([
                'message' => 'This match is not available for joining.'
            ], 422);
        }

        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember) {
            return response()->json([
                'message' => 'You must be a member of a team.'
            ], 422);
        }

        $teamId = $teamMember->team_id;

        if ($teamId == $match->team1) {
            return response()->json([
                'message' => 'Your team already created this match.'
            ], 422);
        }

        $teamMembersCount = TeamMember::where(
            'team_id',
            $teamId
        )->count();

        if ($teamMembersCount < 7) {
            return response()->json([
                'message' => 'Your team must have at least 7 members.'
            ], 422);
        }

        if ($match->team2 !== null) {
            return response()->json([
                'message' => 'Another team already joined this match.'
            ], 422);
        }

        $match->update([
            'team2' => $teamId,
        ]);

        return response()->json([
            'message' => 'Your team joined the match successfully.',
            'match' => new FootballMatchResource(
                $match->load([
                    'place',
                    'firstTeam',
                    'secondTeam',
                    'winningTeam',
                    'players.player',
                    'players.team'
                ])
            )
        ]);
    }

    public function joinPlayer(Request $request, string $id)
    {
        $match = FootballMatch::findOrFail($id);

        if ($match->status !== 'open') {
            return response()->json([
                'message' => 'This match is not available.'
            ], 422);
        }

        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember) {
            return response()->json([
                'message' => 'You must be a member of a team.'
            ], 422);
        }

        $teamId = $teamMember->team_id;

        if (
            $teamId != $match->team1 &&
            $teamId != $match->team2
        ) {
            return response()->json([
                'message' => 'Your team is not part of this match.'
            ], 403);
        }

        $alreadyJoined = MatchPlayer::where('match_id', $match->id)
            ->where('player_id', $player->id)
            ->exists();

        if ($alreadyJoined) {
            return response()->json([
                'message' => 'You already joined this match.'
            ], 422);
        }

        $teamPlayersCount = MatchPlayer::where(
            'match_id',
            $match->id
        )
        ->where('team_id', $teamId)
        ->count();

        if ($teamPlayersCount >= 5) {
            return response()->json([
                'message' => 'Your team already has 5 players in this match.'
            ], 422);
        }

        $totalPlayers = MatchPlayer::where(
            'match_id',
            $match->id
        )->count();

        if ($totalPlayers >= 10) {
            return response()->json([
                'message' => 'This match already has 10 players.'
            ], 422);
        }

        MatchPlayer::create([
            'match_id' => $match->id,
            'player_id' => $player->id,
            'team_id' => $teamId,
        ]);

        $totalPlayers++;

        if ($totalPlayers == 10) {
            $match->update([
                'status' => 'full'
            ]);
        }

        return response()->json([
            'message' => 'You joined the match successfully.',
            'players' => $totalPlayers,
            'match' => new FootballMatchResource(
                $match->load([
                    'place',
                    'firstTeam',
                    'secondTeam',
                    'winningTeam',
                    'players.player',
                    'players.team'
                ])
            )
        ]);
    }

    public function update(Request $request, string $id)
    {
        $match = FootballMatch::findOrFail($id);

        $request->validate([
            'day' => 'required|date',
            'time' => 'required',
            'place_id' => 'required|exists:places,id',
        ]);

        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember || $teamMember->team_id != $match->team1) {
            return response()->json([
                'message' => 'You are not allowed to update this match'
            ], 403);
        }

        if ($teamMember->grade !== 'captain') {
            return response()->json([
                'message' => 'Only the captain can update the match'
            ], 403);
        }

        if ($match->team2 !== null) {
            return response()->json([
                'message' => 'You cannot update the match after another team joined'
            ], 422);
        }

        $requestedDateTime = Carbon::parse(
            $request->day . ' ' . $request->time
        );

        $existingMatches = FootballMatch::where(
            'place_id',
            $request->place_id
        )
        ->where('id', '!=', $match->id)
        ->whereIn('status', ['open', 'full'])
        ->get();

        foreach ($existingMatches as $existingMatch) {

            $existingDateTime = Carbon::parse(
                $existingMatch->day . ' ' . $existingMatch->time
            );

            $difference = abs(
                $requestedDateTime->diffInMinutes(
                    $existingDateTime,
                    false
                )
            );

            if ($difference <= 60) {
                return response()->json([
                    'message' => 'This place is already reserved within one hour of this time.'
                ], 422);
            }
        }

        $match->update([
            'day' => $request->day,
            'time' => $request->time,
            'place_id' => $request->place_id,
        ]);

        return response()->json([
            'message' => 'Match updated successfully',
            'match' => new FootballMatchResource(
                $match->load([
                    'place',
                    'firstTeam',
                    'secondTeam',
                    'winningTeam',
                    'players.player',
                    'players.team'
                ])
            ),
        ]);
    }

    public function destroy(string $id)
    {
        $match = FootballMatch::findOrFail($id);

        $player = request()->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember || $teamMember->team_id != $match->team1) {
            return response()->json([
                'message' => 'You are not allowed to delete this match'
            ], 403);
        }

        if ($teamMember->grade !== 'captain') {
            return response()->json([
                'message' => 'Only the captain can delete the match'
            ], 403);
        }

        if ($match->team2 !== null) {
            return response()->json([
                'message' => 'You cannot delete the match after another team joined'
            ], 422);
        }

        $match->delete();

        return response()->json([
            'message' => 'Match deleted successfully'
        ]);
    }

    public function myMatches(Request $request)
    {
        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember) {
            return response()->json([
                'message' => 'You are not a member of a team'
            ], 422);
        }

        $teamId = $teamMember->team_id;

        $matches = FootballMatch::with([
            'place',
            'firstTeam',
            'secondTeam',
            'winningTeam',
            'players.player',
            'players.team'
        ])
        ->where(function ($query) use ($teamId) {
            $query->where('team1', $teamId)
                ->orWhere('team2', $teamId);
        })
        ->latest()
        ->get();

        return FootballMatchResource::collection($matches);
    }
}
