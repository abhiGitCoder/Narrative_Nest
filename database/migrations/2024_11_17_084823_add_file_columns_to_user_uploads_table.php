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
            $table->string('file_path')->after('audio_url');
            $table->bigInteger('file_size')->after('file_path');
            $table->string('file_type')->after('file_size');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_uploads', function (Blueprint $table) {
            $table->dropColumn(['file_path', 'file_size', 'file_type']);
        });
    }
};
