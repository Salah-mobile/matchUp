<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\TeamController;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserResource;

Route::controller(AuthController::class)->group(function(){
     Route::post("/register","register")->name("register");
     Route::post("/login","login")->name("login");
});
Route::middleware("auth:sanctum")->group(function(){
    Route::post('/logout',[AuthController::class,'logout'])->name("logout");
    Route::apiResource("players",PlayerController::class);
    Route::apiResource("teams",TeamController::class);
});


