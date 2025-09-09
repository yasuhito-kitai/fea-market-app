<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        return ItemResource::collection(Item::with('user')->get()->sortByDesc('created_at'));
    }

    public function show(int $id)
    {
        return new ItemResource(Item::with(['user','condition','categories'])->findOrFail($id));
    }
}
