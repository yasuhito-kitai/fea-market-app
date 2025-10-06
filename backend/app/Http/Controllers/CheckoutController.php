<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function createIntent(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $item_id=$request->item_id;
        $item=Item::findOrFail($item_id);
        $price=$item->price;
    }
}
