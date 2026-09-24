<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FootballMatchController;
use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post("/register", "register")->name("register");
    Route::post("/login", "login")->name("login");
});

Route::middleware("auth:sanctum")->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::apiResource("players", PlayerController::class);
    Route::apiResource("teams", TeamController::class);
    Route::delete("/quitTeam",[TeamController::class,"QuitTeam"]);
    Route::apiResource("team-membres", TeamMemberController::class);
    Route::apiResource("users", UserController::class);
    Route::apiResource("places", PlaceController::class);

    Route::controller(InvitationController::class)->group(function () {
        Route::get("/invitations", "index");
        Route::post("/invitations", "store");
        Route::post("/invitations/{invitation_id}/accept", "accept");
        Route::post("/invitations/{invitation_id}/reject", "reject");
    });
    Route::get('/showByTeam',[TeamMemberController::class,"showByTeam"]);

    Route::get("/matchs/my-matches", [
        FootballMatchController::class,
        "myMatches"
    ]);

    Route::post("/matchs/{id}/join", [
        FootballMatchController::class,
        "join"
    ]);

    Route::post("/matchs/{id}/join-player", [
        FootballMatchController::class,
        "joinPlayer"
    ]);

    Route::post("/matchs/{id}/finish", [
        FootballMatchController::class,
        "finish"
    ]);
    Route::delete("/quitMatch",[FootballMatchController::class,"QuitMatch"]);
    Route::apiResource("matchs", FootballMatchController::class);
});
