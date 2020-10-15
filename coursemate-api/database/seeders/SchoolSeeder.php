<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Model\School;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = file_get_contents(database_path('data/schools.json'));
        $schools = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $file));

        foreach($schools as $school){
            \DB::table('schools')->insert([
                'name' => $school->schools,
            ]);
        }
    }
}
