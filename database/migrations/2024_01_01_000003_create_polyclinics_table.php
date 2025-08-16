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
        Schema::create('polyclinics', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the polyclinic');
            $table->string('room_number')->comment('Room number of the polyclinic');
            $table->text('description')->nullable()->comment('Description of the polyclinic');
            $table->time('opening_time')->default('08:00:00')->comment('Opening time');
            $table->time('closing_time')->default('16:00:00')->comment('Closing time');
            $table->boolean('is_active')->default(true)->comment('Whether the polyclinic is active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
            $table->unique(['name', 'room_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('polyclinics');
    }
};