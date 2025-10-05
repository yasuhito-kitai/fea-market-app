<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PurchaseAddressController;
use App\Http\Controllers\PurchaseController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('purchase/address/{item_id}',[PurchaseAddressController::class,'show']);
    Route::post('/purchase',[PurchaseController::class,'store']);
});
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{item_id}',[ItemController::class,'show']);