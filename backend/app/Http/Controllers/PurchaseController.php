<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
        'item_id' => 'required|exists:items,id',
        'payment' => 'required|in:クレジットカード,コンビニ払い',
        'zipcode' => 'nullable|string',
        'address_line' => 'required|string',
        ]);
        
        $item=Item::findOrFail($request->item_id);
        $user_id=auth()->id();
        if($user_id===$item->user_id){
            return abort(403, '自分の商品は購入できません');
        }

        return response()->json(["message" => "購入処理が通りました（仮）"],201);
    }
}
