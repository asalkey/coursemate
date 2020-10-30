<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'user_id',
        'school_id'
    ];

    public function school()
    {
        return $this->belongsTo('App\Models\School');
    }

    public function studygroups()
    {
        return $this->hasMany('App\Models\StudyGroup');
    }

    public function user()
    {
        return $this->belongsToMany('App\Models\Course','user_course')->withTimestamps();
    }
}
