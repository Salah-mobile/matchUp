<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FootballMatchResource;
use App\Models\FootballMatch;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class FootballMatchController extends Controller
{
    public function index()
    {
        $matches = FootballMatch::with([
            'team1',
            'team2',
            'winner'
        ])->get();

        return FootballMatchResource::collection($matches);
    }

    public function store(Request $request)
    {
        $request->validate([
            'day' => 'required|date',
            'time' => 'required',
            'place' => 'required|string',
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
                'message' => 'Your team must have at least 7 members to create a match'
            ], 422);
        }

        $existingMatch = FootballMatch::where('day', $request->day)
            ->where('time', $request->time)
            ->where('place', $request->place)
            ->whereIn('status', ['open', 'full'])
            ->first();

        if ($existingMatch) {
            return response()->json([
                'message' => 'This place is already reserved at this date and time'
            ], 422);
        }

        $match = FootballMatch::create([
            'day' => $request->day,
            'time' => $request->time,
            'place' => $request->place,
            'team1' => $teamMember->team_id,
            'status' => 'open',
        ]);

        return response()->json([
            'message' => 'Match created successfully',
            'match' => new FootballMatchResource(
                $match->load('team1', 'team2', 'winner')
            ),
        ], 201);
    }

    public function show(string $id)
    {
        $match = FootballMatch::with([
            'team1',
            'team2',
            'winner'
        ])->findOrFail($id);

        return new FootballMatchResource($match);
    }

    public function update(Request $request, string $id)
    {
        $match = FootballMatch::findOrFail($id);

        $request->validate([
            'day' => 'required|date',
            'time' => 'required',
            'place' => 'required|string',
        ]);

        $player = $request->user()->player;

        if (!$player) {
            return response()->json([
                'message' => 'Player not found'
            ], 404);
        }

        $teamMember = $player->memberOfteam;

        if (!$teamMember || $teamMember->team_id !== $match->team1) {
            return response()->json([
                'message' => 'You are not allowed to update this match'
            ], 403);
        }

        if ($teamMember->grade !== 'captain') {
            return response()->json([
                'message' => 'Only the captain can update the match'
            ], 403);
        }

        if ($match->team2) {
            return response()->json([
                'message' => 'You cannot update the match after another team joined'
            ], 422);
        }

        $existingMatch = FootballMatch::where('id', '!=', $match->id)
            ->where('day', $request->day)
            ->where('time', $request->time)
            ->where('place', $request->place)
            ->whereIn('status', ['open', 'full'])
            ->first();

        if ($existingMatch) {
            return response()->json([
                'message' => 'This place is already reserved at this date and time'
            ], 422);
        }

        $match->update([
            'day' => $request->day,
            'time' => $request->time,
            'place' => $request->place,
        ]);

        return response()->json([
            'message' => 'Match updated successfully',
            'match' => new FootballMatchResource(
                $match->load('team1', 'team2', 'winner')
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

        if (!$teamMember || $teamMember->team_id !== $match->team1) {
            return response()->json([
                'message' => 'You are not allowed to delete this match'
            ], 403);
        }

        if ($teamMember->grade !== 'captain') {
            return response()->json([
                'message' => 'Only the captain can delete the match'
            ], 403);
        }

        if ($match->team2) {
            return response()->json([
                'message' => 'You cannot delete the match after another team joined'
            ], 422);
        }

        $match->delete();

        return response()->json([
            'message' => 'Match deleted successfully'
        ]);
    }
}
