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
        Schema::create('queues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('polyclinic_id')->constrained('polyclinics')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('queue_number')->comment('Queue number for the patient');
            $table->date('queue_date')->comment('Date of the queue');
            $table->enum('status', ['waiting', 'called', 'serving', 'served', 'skipped', 'cancelled'])
                  ->default('waiting')->comment('Status of the queue');
            $table->timestamp('called_at')->nullable()->comment('Time when patient was called');
            $table->timestamp('served_at')->nullable()->comment('Time when patient was served');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['polyclinic_id', 'queue_date']);
            $table->index(['polyclinic_id', 'queue_date', 'status']);
            $table->index(['user_id', 'queue_date']);
            $table->index('status');
            $table->index('queue_date');
            $table->unique(['polyclinic_id', 'queue_number', 'queue_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queues');
    }
};