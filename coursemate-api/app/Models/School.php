<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    public function courses()
    {
        return $this->hasMany('App\Models\Course');
    }

    public function users()
    {
        return $this->hasMany('App\Models\User');
    }
}
