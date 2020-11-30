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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::apiResource('studygroups', App\Http\Controllers\API\StudyGroupController::class);

    Route::apiResource('courses', App\Http\Controllers\API\CourseController::class);

    Route::get('/courses/search/{id}', [App\Http\Controllers\API\CourseController::class, 'search']);

    Route::get('/s', [App\Http\Controllers\API\StudyGroupController::class, 'search']);
});

   Route::get('/schools/search/{school}', [App\Http\Controllers\API\SchoolController::class, 'search']);

Route::apiResource('schools', App\Http\Controllers\API\SchoolController::class);
