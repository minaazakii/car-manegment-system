<?php

namespace Database\Factories;

use App\Models\CarType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SparePart>
 */
class SparePartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'car_type_id' => CarType::inRandomOrder()->first()->id,
            'type' => fake()->randomElement(['spare_part', 'material']),
            'code' => fake()->postcode(),
            'price' => fake()->numberBetween(1, 10000),
            'stock' => fake()->numberBetween(1, 100),
            'notes' => fake()->text(),
        ];
    }
}
