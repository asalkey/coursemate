<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudyGroup;
use App\Notifications\CancelledNotice;
use App\Notifications\JoinedNotice;

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
           'link' => 'required_if:remote,true|url',
           'address' => 'required_if:remote,false',
           'city' => 'required_if:remote,false|nullable|alpha',
           'state' => 'required_if:remote,false|nullable|min:2|alpha'
        ]);

        $studyGroup = StudyGroup::create($request->all());

        $request->user()->studygroups()->save($studyGroup, ['creator' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        return StudyGroup::with('users')->where('course_id', '=', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $studyGroup = StudyGroup::findOrFail($id);

        switch ($request->data) {
            case 'cancel':
                $studyGroup->delete($request->all());
                $request->user()->notify(new CancelledNotice($request->user()->name));
                break;
            case 'leave':
                $request->user()->studygroups()->detach($id);

                break;
            case 'join':
                $request->user()->studygroups()->save($studyGroup, ['creator' => false]);
                $request->user()->notify(new JoinedNotice($request->user()->name, $studyGroup));
                break;
        }


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


    public function search(Request $request){
         return StudyGroup::with('users')
            ->where('course_id', '=', $request->course_id)
            ->where(function ($query) use($request) {
               $query->where('date', '=', $request->date)
                     ->orWhere('time', '=', $request->time);
            })->get();
    }
}
