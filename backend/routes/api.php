<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{id}',[ItemController::class,'show']);