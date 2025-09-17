<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class PurchaseAddressController extends Controller
{
    public function show($item_id)
    {
        //送られてきたidから商品を探す→存在しなければ404(findOrFail)
        $item=Item::findOrFail($item_id);
        //商品の出品したユーザーとログインユーザーが同じ場合は403を返す
        $user_id=auth()->id();
        if($user_id===$item->user_id){
            return abort(403, '自分の商品は購入できません');
        }
        //住所情報を取り出してJSON形式で返す
        $user=auth()->user();
        return response()->json([
            'zipcode'=>$user->zipcode,
            'address'=>$user->address,
            'building'=>$user->building,
            //２段目表示用
            'address_line'=>trim(($user->address ?? '') . ' ' . ($user->building ?? '')),
        ]);
    }
}