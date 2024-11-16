<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            // Drop the foreign key constraint on genre_id
            $table->dropForeign(['genre_id']);
            
            // Change genre_id to a string column instead of a foreign key
            $table->string('genre_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            // Revert the column back to a foreign key relationship
            $table->dropColumn('genre_id');
            $table->foreignId('genre_id')->constrained('genres'); // Recreate the foreign key constraint
        });
    }
};
