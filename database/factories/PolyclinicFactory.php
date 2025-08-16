<?php

namespace Database\Factories;

use App\Models\Polyclinic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Polyclinic>
 */
class PolyclinicFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Polyclinic>
     */
    protected $model = Polyclinic::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $polyclinics = [
            'Poli Umum',
            'Poli Anak',
            'Poli Gigi',
            'Poli Mata',
            'Poli KIA',
            'Poli Lansia',
            'Poli TB',
        ];

        return [
            'name' => fake()->randomElement($polyclinics),
            'room_number' => fake()->bothify('R-##'),
            'description' => fake()->sentence(),
            'opening_time' => '08:00:00',
            'closing_time' => '16:00:00',
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the polyclinic is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}