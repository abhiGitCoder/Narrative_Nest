<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\HomeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [RegisterController::class, 'logout']);
    Route::post('refresh', [RegisterController::class, 'refresh']);
    Route::get('/user', [RegisterController::class, 'getUser']);
});

Route::get('/home-data', [HomeController::class, 'homeData']);
Route::get('/story-data', [HomeController::class, 'storyData']);
Route::get('/music-data', [HomeController::class, 'musicData']);

// Route::middleware('auth:api')->get('/user', [RegisterController::class, 'getUser']);