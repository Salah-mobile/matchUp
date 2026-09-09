<?php

use App\Http\Controllers\Api\AuthController;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function(){
     Route::post("/register","register")->name("register");
     Route::post("/login","login")->name("login");
     Route::middleware("auth:sanctum")->post("/logout","logout")->name("logout");
});



