<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FootballMatchController;
use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\UserController;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserResource;
use App\Models\FootballMatch;

Route::controller(AuthController::class)->group(function(){
     Route::post("/register","register")->name("register");
     Route::post("/login","login")->name("login");
});
Route::middleware("auth:sanctum")->group(function(){
    Route::post('/logout',[AuthController::class,'logout'])->name("logout");
    Route::apiResource("players",PlayerController::class);
    Route::apiResource("teams",TeamController::class);
    Route::apiResource("team-membres",TeamMemberController::class);
    Route::controller(InvitationController::class)->group(function(){
            Route::get('/invitations', 'index');
            Route::post('/invitations', 'store');
            Route::post('/invitations/{invitation}/accept', 'accept');
            Route::post('/invitations/{invitation}/reject', 'reject');
    });
    Route::apiResource("users",UserController::class);
    Route::apiResource("FootballMatch",FootballMatchController::class);
});

