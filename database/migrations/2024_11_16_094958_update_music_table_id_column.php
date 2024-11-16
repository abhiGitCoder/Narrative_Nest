<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('music', function (Blueprint $table) {
            // Drop the uuid primary key
            $table->dropPrimary('id');
            $table->dropColumn('id');
            
            // Add new auto-incrementing id
            $table->id()->first();
        });
    }

    public function down(): void
    {
        Schema::table('podcasts', function (Blueprint $table) {
            $table->dropColumn('id');
            $table->string('id')->primary()->first();
        });
    }
};