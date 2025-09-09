<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
{
    $validated = $request->validate([
        'username' => ['required','string','max:50'],
        'zipcode'  => ['required','regex:/^\d{3}-?\d{4}$/'],
        'address'  => ['required','string','max:255'],
        'building' => ['nullable','string','max:255'],
    ]);

    $user = $request->user();
    $user->fill([
        'username' => $validated['username'],
        'zipcode'  => $validated['zipcode'] ,
        'address'  => $validated['address'] ,
        'building' => $validated['building'] ?? null,
    ])->save();

    return response()->json(['message' => 'プロフィールを更新しました'], 200);
}
}
