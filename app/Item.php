<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
 protected $fillable = ['title', 'description', 'priority', 'completed', 'user_id'];

 public function user() {
 	return $this->belongsTo('App\User'); 
 }

}
