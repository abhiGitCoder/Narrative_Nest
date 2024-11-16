<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            // First check if the foreign key constraint exists before trying to drop it
            $foreignKeys = DB::select("
                SELECT CONSTRAINT_NAME
                FROM information_schema.TABLE_CONSTRAINTS
                WHERE TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = 'stories'
                AND CONSTRAINT_TYPE = 'FOREIGN KEY'
                AND CONSTRAINT_NAME = 'stories_genre_id_foreign'
            ");

            if (!empty($foreignKeys)) {
                $table->dropForeign(['genre_id']);
            }

            // Check if genre_id column exists
            if (Schema::hasColumn('stories', 'genre_id')) {
                $table->dropColumn('genre_id');
            }

            // Add the new genres column
            $table->string('genres')->nullable()->after('published_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            $table->dropColumn('genres');
            // If you need to recreate the genre_id column
            $table->unsignedBigInteger('genre_id')->nullable();
        });
    }
};