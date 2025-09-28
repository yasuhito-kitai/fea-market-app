<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        return ItemResource::collection(
            Item::with('user')
            // NOTE: ここは auth:sanctum or 任意認証ミドルウェアを通した場合のみ効く。
            // 現状の公開API(apiグループ)では auth()->check() は false になりがちなので no-op。
            // 将来、認証を効かせたら自分の出品を除外できる。
                ->when(auth()->check(), function ($query) {
                    $query->where('user_id', '!=', auth()->id());
                })->orderByDesc('created_at')
                ->get()
        );
    }

    public function show(int $item_id)
    {
        return new ItemResource(Item::with(['user','condition','categories'])->findOrFail($item_id));
    }
}
