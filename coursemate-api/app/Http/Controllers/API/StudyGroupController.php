<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudyGroup;

class StudyGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StudyGroup::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
           'description' => 'required',
           'notes' => 'required',
           'date' => 'required|date',
           'time' => 'required',
           'remote' => 'required|boolean',
           'link' => 'required|url',
           'address' => 'required|min:255',
           'city' => 'required|alpha',
           'state' => 'required|min:2|alpha'
        ]);

        $studyGroup = new StudyGroup();
        $studyGroup->description = $request->description;
        $studyGroup->notes = $request->notes;
        $studyGroup->date = $request->date;
        $studyGroup->description = $request->time;
        $studyGroup->user()->associate($user);
        $studyGroup->course()->associate($course);
        return $studyGroup->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return StudyGroup::find($id);
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
        $studyGroup = StudyGroup::findOrFail($id);
        $studyGroup->update($request->all());

        return $studyGroup;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $studyGroup = StudyGroup::findOrFail($id);
        $studyGroup->delete($request->all());

        return $studyGroup;
    }
}
