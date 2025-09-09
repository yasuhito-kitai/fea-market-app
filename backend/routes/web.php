<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

// Fortifyの登録はweb側に置く（guestで保護）
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest']);