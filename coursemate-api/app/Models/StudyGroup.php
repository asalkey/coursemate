<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyGroup extends Model
{
    use HasFactory;

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User')
            ->withTimestamps();
    }
}
