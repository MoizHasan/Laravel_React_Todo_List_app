<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('items', 'ItemController@index')->name('items');

Route::middleware('auth:api')->get('items/{item}', 'ItemController@show')->name('item');

Route::middleware('auth:api')->post('item', 'ItemController@store')->name('item');

Route::middleware('auth:api')->put('items/{item}', 'ItemController@update'); 

Route::middleware('auth:api')->put('item_complete/{item}', 'ItemController@toggleComplete'); 

Route::middleware('auth:api')->delete('items/{item}', 'ItemController@Delete');