<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('items')->insert([
        'user_id'=>'1',
        'condition_id'=>'1',
        'item_name' => '腕時計',
        'price' => '15000',
        'description'=>'スタイリッシュなデザインのメンズ腕時計',
        'image_url'=>'https://coachtech-matter.s3.ap-northeast-1.amazonaws.com/image/Armani+Mens+Clock.jpg'
       ]);

       DB::table('items')->insert([
        'user_id'=>'1',
        'condition_id'=>'2',
        'item_name' => 'HDD',
        'price' => '5000',
        'description'=>'高速で信頼性の高いハードディスク',
        'image_url'=>'https://coachtech-matter.s3.ap-northeast-1.amazonaws.com/image/HDD+Hard+Disk.jpg'
       ]);
    }
}
