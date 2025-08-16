<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create(['role' => 'user']));

    $response = $this->get('/dashboard');
    $response->assertRedirect('/queues');
});

test('admin users are redirected to admin dashboard', function () {
    $this->actingAs($user = User::factory()->create(['role' => 'admin']));

    $response = $this->get('/dashboard');
    $response->assertRedirect('/admin');
});
