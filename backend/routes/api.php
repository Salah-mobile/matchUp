<?php

use App\Http\Controllers\Api\AuthController;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserResource;

Route::controller(AuthController::class)->group(function(){
     Route::post("/register","register")->name("register");
     Route::post("/login","login")->name("login");
     Route::middleware("auth:sanctum")->post("/logout","logout")->name("logout");
     Route::middleware("auth:sanctum")->get("/profile",function(Request $request){
         return new UserResource($request->user());
     });
});



