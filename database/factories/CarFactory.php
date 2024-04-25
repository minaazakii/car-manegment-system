<?php

namespace Database\Factories;

use App\Models\CarType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'make' => fake()->name(),
            'model' => fake()->numberBetween(1990, 2024),
            'user_id' => User::InRandomOrder()->first()->id,
            'car_type_id' => CarType::InRandomOrder()->first()->id,
            'plate_number' => fake()->numberBetween(1, 3000),
            'chase_number' => fake()->numberBetween(1, 3000),
            'color' => fake()->colorName(),
            'motor_number' => fake()->numberBetween(2, 3000),
            'entry_date' => fake()->date(),
            'exit_date' => fake()->date(),
        ];
    }
}
