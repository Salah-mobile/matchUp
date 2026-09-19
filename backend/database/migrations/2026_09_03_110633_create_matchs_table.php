<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matchs', function (Blueprint $table) {
            $table->id();

            $table->date('day');
            $table->time('time');
            $table->string('place');

            $table->foreignId('team1')
                ->constrained('teams')
                ->cascadeOnDelete();

            $table->foreignId('team2')
                ->nullable()
                ->constrained('teams')
                ->nullOnDelete();

            $table->foreignId('winner')
                ->nullable()
                ->constrained('teams')
                ->nullOnDelete();

            $table->enum('status', [
                'open',
                'full',
                'finished',
                'cancelled'
            ])->default('open');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matchs');
    }
};
