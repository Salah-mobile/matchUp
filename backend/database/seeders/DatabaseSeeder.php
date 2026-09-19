<?php

namespace Database\Seeders;

use App\Models\Place;
use App\Models\User;
use App\Models\Player;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['Ahmed', 'Alaoui', 'ahmed@test.com'],
            ['Youssef', 'Amrani', 'youssef@test.com'],
            ['Omar', 'Bennani', 'omar@test.com'],
            ['Hamza', 'Idrissi', 'hamza@test.com'],
            ['Ayoub', 'Fassi', 'ayoub@test.com'],
            ['Mehdi', 'Chraibi', 'mehdi@test.com'],
            ['Anas', 'El Amrani', 'anas@test.com'],
            ['Zakaria', 'Berrada', 'zakaria@test.com'],
            ['Ismail', 'Tazi', 'ismail@test.com'],
            ['Reda', 'El Idrissi', 'reda@test.com'],
        ];

        foreach ($users as $data) {
            $user = User::create([
                'name' => $data[0],
                'lastname' => $data[1],
                'email' => $data[2],
                'password' => Hash::make('password123'),
            ]);

            Player::create([
                'position' => 'Attacker',
                'level' => 1,
                'points' => 0,
                'trustworthy' => 100,
                'user_id' => $user->id,
            ]);
            Place::create([
                'name' => 'Atlas Football',
                'price' => 100,
                'adress' => 'Centre Ville',
                'city' => 'Beni Mellal',
            ]);

            Place::create([
                'name' => 'City Soccer',
                'price' => 120,
                'adress' => 'Hay Al Qods',
                'city' => 'Beni Mellal',
            ]);

            Place::create([
                'name' => 'Olympic Stadium',
                'price' => 150,
                'adress' => 'Hay Salam',
                'city' => 'Beni Mellal',
            ]);

            Place::create([
                'name' => 'Green Field',
                'price' => 130,
                'adress' => 'Moulay Rachid',
                'city' => 'Beni Mellal',
            ]);
            TeamMember::create([
                'team_id' => 1,
                'player_id' => 2,
                'grade' => 'member',
                'joined_at' => now(),
            ]);

            TeamMember::create([
                'team_id' => 1,
                'player_id' => 3,
                'grade' => 'member',
                'joined_at' => now(),
            ]);

            TeamMember::create([
                'team_id' => 1,
                'player_id' => 4,
                'grade' => 'member',
                'joined_at' => now(),
            ]);

            TeamMember::create([
                'team_id' => 1,
                'player_id' => 5,
                'grade' => 'member',
                'joined_at' => now(),
            ]);

            TeamMember::create([
                'team_id' => 1,
                'player_id' => 6,
                'grade' => 'member',
                'joined_at' => now(),
            ]);

            TeamMember::create([
                'team_id' => 1,
                'player_id' => 7,
                'grade' => 'member',
                'joined_at' => now(),
            ]);
        }
    }
}
