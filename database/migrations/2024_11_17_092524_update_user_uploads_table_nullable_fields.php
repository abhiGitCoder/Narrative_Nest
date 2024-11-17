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
            $table->string('content_type')->nullable()->change();
            $table->unsignedBigInteger('content_id')->nullable()->change();
            $table->string('genres')->nullable()->change();
            $table->string('status')->nullable()->change();
            $table->string('file_path')->nullable()->change();
            $table->unsignedBigInteger('file_size')->nullable()->change();
            $table->string('file_type')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_uploads', function (Blueprint $table) {
            $table->string('content_type')->nullable(false)->change();
            $table->unsignedBigInteger('content_id')->nullable(false)->change();
            $table->string('genres')->nullable(false)->change();
            $table->string('status')->nullable(false)->change();
            $table->string('file_path')->nullable(false)->change();
            $table->unsignedBigInteger('file_size')->nullable(false)->change();
            $table->string('file_type')->nullable(false)->change();
        });
    }
};
