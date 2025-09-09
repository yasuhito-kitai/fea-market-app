<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
        'content'=>'メンズ',
    ]);

        DB::table('categories')->insert([
        'content'=>'レディース',
    ]);

        DB::table('categories')->insert([
        'content'=>'時計',
    ]);

        DB::table('categories')->insert([
        'content'=>'洋服',
    ]);

        DB::table('categories')->insert([
        'content'=>'雑貨',
    ]);

        DB::table('categories')->insert([
        'content'=>'野菜',
    ]);

        DB::table('categories')->insert([
        'content'=>'PC',
    ]);

        DB::table('categories')->insert([
        'content'=>'AV機器',
    ]);
    }
}
