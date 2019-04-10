<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Item;
use App\User;

class ItemController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }


//Return all items associated with this user.
public function index() 
{
	Auth::guard('api')->user();
	$user_id = Auth::guard('api')->id();
	$items = DB::table('items')->where('user_id', '=', $user_id)->get();
	return response()->json($items, 200);
}

public function show(Item $item)
{
	return $item;
}

//Create a new item

public function store(Request $request) 
{
	$user_id = Auth::guard('api')->id();
	$item = Item::create(array_merge($request->all(), ['user_id' => $user_id]));

	return response()->json($item, 201); 
}

public function update(Request $request, Item $item)
{
	$item->update($request->all());

	return response()->json($item, 200); 
}

//Mark as complete or not complete
public function toggleComplete(Item $item) {
	$item->completed = ($item->completed === 0) ? 1 : 0;
	$item->save(); 
	return response()->json("Updated Status.", 200); 
}

public function delete(Item $item)
{
	$item->delete();
	return response()->json(null, 204); 
}

}