<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\RegisterResponse;

class CustomRegisterResponse implements RegisterResponse
{
    public function toResponse($request)
    {
        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $request->user(),
        ]);
    }
}
