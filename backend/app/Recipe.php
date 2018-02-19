<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    public function lists()
    {
        return $this->belongsToMany('App\Lists');
    }
}
