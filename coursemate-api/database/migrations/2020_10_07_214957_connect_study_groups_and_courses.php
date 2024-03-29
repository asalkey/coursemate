<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ConnectStudyGroupsAndCourses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('study_groups', function (Blueprint $table) {
            $table->bigInteger('course_id')->unsigned();

            $table->foreign('course_id')->references('id')->on('courses');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('study_groups', function (Blueprint $table) {
            $table->dropForeign('study_groups_course_id_foreign');

            $table->dropColumn('course_id');
        });
    }
}
