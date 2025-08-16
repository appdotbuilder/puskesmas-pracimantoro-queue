<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.index');
        }
        return redirect()->route('queues.index');
    })->name('dashboard');

    // Queue Management Routes
    Route::resource('queues', \App\Http\Controllers\QueueController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
    
    // Admin Routes - require admin role
    Route::middleware(['auth', \App\Http\Middleware\AdminOnly::class])->group(function () {
        Route::resource('admin', \App\Http\Controllers\AdminController::class)->only(['index']);
        Route::resource('polyclinics', \App\Http\Controllers\PolyclinicController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
