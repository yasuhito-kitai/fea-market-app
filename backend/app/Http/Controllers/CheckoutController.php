<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Item;

class CheckoutController extends Controller
{
    public function createIntent(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $item_id=$request->item_id;
        $item=Item::findOrFail($item_id);
        $price=$item->price;
        
        $params=[
            'amount' => (int) $price,
            'currency' => 'jpy',
            'payment_method_types' => ['card'],
        ];
        $paymentIntent=PaymentIntent::create($params);
        return response()->json(['clientSecret'=>$paymentIntent->client_secret],201);
        
    }
}
