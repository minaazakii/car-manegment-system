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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete();
            $table->string('client_name');
            $table->string('brand_name');
            $table->string('phone');
            $table->string('car_model');
            $table->string('plate_number');
            $table->string('chase_number');
            $table->string('motor');
            $table->string('car_counter');
            $table->string('car_color');
            $table->text('notes')->nullable();
            $table->float('sub_total');
            $table->float('tax_rate')->default(0);
            $table->float('tax_amount')->default(0);
            $table->float('grand_total');
            $table->date('entry_date');
            $table->date('exit_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
