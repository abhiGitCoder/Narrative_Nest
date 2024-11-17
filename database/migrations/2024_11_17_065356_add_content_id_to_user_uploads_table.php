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
        Schema::table('user_uploads', function (Blueprint $table) {
            // Add the 'content_id' column as a nullable big integer after 'content_type'
            $table->bigInteger('content_id')->nullable()->after('content_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_uploads', function (Blueprint $table) {
            // Drop the 'content_id' column if the migration is rolled back
            $table->dropColumn('content_id');
        });
    }
};
