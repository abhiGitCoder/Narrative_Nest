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
            // Drop the foreign key constraint if it exists
            if (Schema::hasColumn('stories', 'content_type_id')) {
                $table->dropForeign(['content_type_id']);
                $table->dropColumn('content_type_id');
            }

            // Add the new content_type column as a string
            $table->string('content_type')->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stories', function (Blueprint $table) {
            // Remove the content_type column
            $table->dropColumn('content_type');

            // Add back the content_type_id as a foreignId
            $table->foreignId('content_type_id')->constrained('content_types')->after('description');
        });
    }
};
