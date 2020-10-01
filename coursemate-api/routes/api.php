<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//study group routes
Route::get('studygroups', function() {
});

Route::get('studygroups/{id}', function($id) {

});

Route::post('studygroups', function(Request $request) {

});

Route::put('studygroups/{id}', function(Request $request, $id) {
});

Route::delete('studygroups/{id}', function($id) {
});


//university and colleges routes
Route::get('schools', function() {
});

Route::get('schools/{id}', function($id) {

});

Route::post('schools', function(Request $request) {

});

Route::put('schools/{id}', function(Request $request, $id) {
});

Route::delete('schools/{id}', function($id) {
});

//courses routes
Route::get('courses', function() {
});

Route::get('courses/{id}', function($id) {

});

Route::post('courses', function(Request $request) {

});

Route::put('courses/{id}', function(Request $request, $id) {
});

Route::delete('courses/{id}', function($id) {
});
