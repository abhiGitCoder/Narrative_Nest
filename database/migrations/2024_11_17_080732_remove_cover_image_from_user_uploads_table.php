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
            $table->dropColumn('cover_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_uploads', function (Blueprint $table) {
            $table->string('cover_image'); // Re-add the column in case of rollback
        });
    }
};
