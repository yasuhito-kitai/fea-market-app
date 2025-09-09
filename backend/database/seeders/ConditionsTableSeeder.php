<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConditionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('conditions')->insert([
        'content'=>'良好',
    ]);

        DB::table('conditions')->insert([
        'content'=>'目立った傷や汚れなし',
    ]);

        DB::table('conditions')->insert([
        'content'=>'やや傷や汚れあり',
    ]);

        DB::table('conditions')->insert([
        'content'=>'状態が悪い',
    ]);

    }
}
