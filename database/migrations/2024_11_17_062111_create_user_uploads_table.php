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
        Schema::create('user_uploads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('registers')->onDelete('cascade');
            $table->enum('content_type', ['story', 'podcast', 'music']);
            $table->string('title');
            $table->string('genres');
            $table->string('cover_image');
            $table->string('audio_url');
            $table->enum('status', ['active', 'inactive', 'deleted'])->default('active');
            $table->timestamps();
            
            $table->index(['user_id', 'content_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_uploads');
    }
};
