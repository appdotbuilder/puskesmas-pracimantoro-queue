<?php

namespace Database\Factories;

use App\Models\Queue;
use App\Models\Polyclinic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Queue>
 */
class QueueFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Queue>
     */
    protected $model = Queue::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['waiting', 'called', 'serving', 'served', 'skipped']);
        
        return [
            'polyclinic_id' => Polyclinic::factory(),
            'user_id' => User::factory(),
            'queue_number' => fake()->numberBetween(1, 50),
            'queue_date' => fake()->dateTimeBetween('-7 days', '+1 days')->format('Y-m-d'),
            'status' => $status,
            'called_at' => in_array($status, ['called', 'serving', 'served']) ? fake()->dateTimeThisMonth() : null,
            'served_at' => $status === 'served' ? fake()->dateTimeThisMonth() : null,
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the queue is for today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'queue_date' => today(),
        ]);
    }

    /**
     * Indicate that the queue is waiting.
     */
    public function waiting(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'waiting',
            'called_at' => null,
            'served_at' => null,
        ]);
    }

    /**
     * Indicate that the queue is served.
     */
    public function served(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'served',
            'called_at' => fake()->dateTimeThisMonth(),
            'served_at' => fake()->dateTimeThisMonth(),
        ]);
    }
}