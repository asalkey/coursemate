<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ConnectUsersAndStudyGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_study_group', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('study_group_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('study_group_id')->references('id')->on('study_groups');
            $table->foreign('user_id')->references('id')->on('users');
            $table->boolean('creator');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_study_group');
    }
}
