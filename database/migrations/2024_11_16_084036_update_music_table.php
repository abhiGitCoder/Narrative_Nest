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
        Schema::create('music', function (Blueprint $table) {
            $table->string('id')->primary();  // Changed to string ID as per schema
            $table->string('title');
            $table->string('description');
            $table->string('content_type')->default('music');  // Directly storing 'music' as per schema
            $table->string('artist');
            $table->string('cover_image');
            $table->integer('duration')->unsigned();  // For storing duration in seconds
            $table->string('album');
            $table->string('genre');  // Directly storing genre string as per schema
            $table->string('audio_url');
            $table->date('published_date');  // Changed to date type as per schema
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_new_release')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music');
    }
};