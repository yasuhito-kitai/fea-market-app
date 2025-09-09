<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
        'username'=>'test',
        'email'=>'test@mail.com',
        'zipcode'=>'123-4567',
        'address'=>'神奈川県川崎市',
        'building'=>'ハイツなんとか',
        'email_verified_at' => '2025-01-01 12:00:00',
        'password' => bcrypt('12345678')
    ]);
    }
}
