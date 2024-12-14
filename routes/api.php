<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Car\CarController;
use App\Http\Controllers\Api\Bill\BillController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Car\CarTypeController;
use App\Http\Controllers\Api\Client\ClientController;
use App\Http\Controllers\Api\SparePart\SparePartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/users', UserController::class);

Route::apiResource('/clients', ClientController::class);


Route::get('/car-types/{typeId}/brands', [CarTypeController::class, 'getCarTypeBrands']);
Route::apiResource('/car-types', CarTypeController::class);

Route::apiResource('/spare-parts', SparePartController::class);

Route::apiResource('/cars', CarController::class);

Route::apiResource('/bills', BillController::class)->except('update');
