<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Player;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\Place;
use App\Models\FootballMatch;
use App\Models\MatchPlayer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [];

        for ($i = 1; $i <= 20; $i++) {

            $user = User::create([
                'name' => 'Player',
                'lastname' => $i,
                'email' => "player$i@gmail.com",
                'password' => Hash::make('password123'),
            ]);
            
            $player = Player::create([
                'position' => 'Attacker',
                'level' => 1,
                'points' => 50 + ($i * 10),
                'trustworthy' => 80 + ($i % 20),
                'user_id' => $user->id,
            ]);

            $users[] = $player;
        }

        $team1 = Team::create([
            'name' => 'Atlas FC',
            'description' => 'Atlas football team',
            'logo' => '',
            'classment' => 1,
            'captain' => $users[0]->id,
        ]);

        $team2 = Team::create([
            'name' => 'Beni Mellal Stars',
            'description' => 'Beni Mellal football team',
            'logo' => '',
            'classment' => 2,
            'captain' => $users[5]->id,
        ]);

        $team3 = Team::create([
            'name' => 'Lions FC',
            'description' => 'Lions football team',
            'logo' => '',
            'classment' => 3,
            'captain' => $users[10]->id,
        ]);

        for ($i = 0; $i < 5; $i++) {

            TeamMember::create([
                'team_id' => $team1->id,
                'player_id' => $users[$i]->id,
                'grade' => $i === 0 ? 'captain' : 'member',
                'joined_at' => now(),
            ]);
        }

        for ($i = 5; $i < 10; $i++) {

            TeamMember::create([
                'team_id' => $team2->id,
                'player_id' => $users[$i]->id,
                'grade' => $i === 5 ? 'captain' : 'member',
                'joined_at' => now(),
            ]);
        }

        for ($i = 10; $i < 15; $i++) {

            TeamMember::create([
                'team_id' => $team3->id,
                'player_id' => $users[$i]->id,
                'grade' => $i === 10 ? 'captain' : 'member',
                'joined_at' => now(),
            ]);
        }

        $place1 = Place::create([
            'name' => 'Beni Mellal Football Arena',
            'price' => 150,
            'adress' => 'Centre Ville',
            'city' => 'Beni Mellal',
        ]);

        $place2 = Place::create([
            'name' => 'Atlas Stadium',
            'price' => 200,
            'adress' => 'Hay Al Massira',
            'city' => 'Beni Mellal',
        ]);

        $place3 = Place::create([
            'name' => 'Lions Football Ground',
            'price' => 120,
            'adress' => 'Hay Riad',
            'city' => 'Beni Mellal',
        ]);

        $upcomingMatch = FootballMatch::create([
            'day' => now()->addDays(2)->format('Y-m-d'),
            'time' => '18:00:00',
            'place_id' => $place1->id,
            'team1' => $team1->id,
            'team2' => $team2->id,
            'winner' => null,
            'status' => 'full',
        ]);

        for ($i = 0; $i < 5; $i++) {

            MatchPlayer::create([
                'match_id' => $upcomingMatch->id,
                'player_id' => $users[$i]->id,
                'team_id' => $team1->id,
            ]);

            MatchPlayer::create([
                'match_id' => $upcomingMatch->id,
                'player_id' => $users[$i + 5]->id,
                'team_id' => $team2->id,
            ]);
        }

        $openMatch = FootballMatch::create([
            'day' => now()->addDays(3)->format('Y-m-d'),
            'time' => '20:00:00',
            'place_id' => $place2->id,
            'team1' => $team3->id,
            'team2' => null,
            'winner' => null,
            'status' => 'open',
        ]);

        for ($i = 10; $i < 13; $i++) {

            MatchPlayer::create([
                'match_id' => $openMatch->id,
                'player_id' => $users[$i]->id,
                'team_id' => $team3->id,
            ]);
        }

        $finishedMatch = FootballMatch::create([
            'day' => now()->subDays(3)->format('Y-m-d'),
            'time' => '18:00:00',
            'place_id' => $place3->id,
            'team1' => $team1->id,
            'team2' => $team2->id,
            'winner' => $team1->id,
            'status' => 'finished',
        ]);

        for ($i = 0; $i < 5; $i++) {

            MatchPlayer::create([
                'match_id' => $finishedMatch->id,
                'player_id' => $users[$i]->id,
                'team_id' => $team1->id,
            ]);

            MatchPlayer::create([
                'match_id' => $finishedMatch->id,
                'player_id' => $users[$i + 5]->id,
                'team_id' => $team2->id,
            ]);
        }

        $drawMatch = FootballMatch::create([
            'day' => now()->subDays(5)->format('Y-m-d'),
            'time' => '20:00:00',
            'place_id' => $place1->id,
            'team1' => $team2->id,
            'team2' => $team3->id,
            'winner' => null,
            'status' => 'finished',
        ]);

        for ($i = 5; $i < 10; $i++) {

            MatchPlayer::create([
                'match_id' => $drawMatch->id,
                'player_id' => $users[$i]->id,
                'team_id' => $team2->id,
            ]);
        }

        for ($i = 10; $i < 15; $i++) {

            MatchPlayer::create([
                'match_id' => $drawMatch->id,
                'player_id' => $users[$i]->id,
                'team_id' => $team3->id,
            ]);
        }
    }
}

