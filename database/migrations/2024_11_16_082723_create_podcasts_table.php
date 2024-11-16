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
        Schema::create('podcasts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('content_type_id')->constrained('content_types');
            $table->string('host');
            $table->string('cover_image')->nullable();
            $table->integer('duration')->unsigned();
            $table->integer('episode_number')->unsigned();
            $table->timestamp('published_date')->useCurrent();
            $table->string('audio_url');
            $table->foreignId('genre_id')->constrained('genres');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_new_release')->default(true);
            $table->timestamps();

            // Add indexes
            $table->index('published_date');
            $table->index('genre_id');
            $table->index('episode_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('podcasts');
    }
};