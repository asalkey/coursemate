<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\School;
use Illuminate\Validation\Rule;
use Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $request->user()->courses;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
           'number' =>[ "required",
            function ($attribute, $value, $fail) use ($request){
                $courseExist = $request->user()->courses()->where('number' ,$value)->exists();

                if ($courseExist) {
                    $fail("{$value} is already in your list");
                }
            },]
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->messages()],422);
        }

        $course = Course::firstOrCreate(
                    ['number' => $request->number],
                    ['school_id' => $request->user()->school_id
                  ]);

        $request->user()->courses()->save($course);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Course::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->all());

        return $course;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {

        $request->user()->courses()->detach($id);

    }

    public function search($id)
    {
        $school = School::find($id);

        return $school->courses;
    }
}
