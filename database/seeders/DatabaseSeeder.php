<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed content types
        DB::table('content_types')->insert([
            ['name' => 'stories'],
            ['name' => 'podcasts'],
            ['name' => 'music'],
        ]);

        // Seed genres
        DB::table('genres')->insert([
            // Story genres
            ['name' => 'fiction', 'category' => 'stories'],
            ['name' => 'non-fiction', 'category' => 'stories'],
            ['name' => 'fantasy', 'category' => 'stories'],
            
            // Podcast genres
            ['name' => 'tech', 'category' => 'podcasts'],
            ['name' => 'culture', 'category' => 'podcasts'],
            ['name' => 'education', 'category' => 'podcasts'],
            
            // Music genres
            ['name' => 'rock', 'category' => 'music'],
            ['name' => 'jazz', 'category' => 'music'],
            ['name' => 'classical', 'category' => 'music'],
        ]);
    }
}