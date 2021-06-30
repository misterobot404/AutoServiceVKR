<?php

use App\Http\Controllers\API\RecordController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * API Authentication
 */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

/**
 * Проверка доступности почты / логина для регистрации
 */
Route::get('/users/{email}/check-available', [AuthController::class, 'emailAvailableCheck'])->where('email', '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
Route::get('/users/{name}/check-available', [AuthController::class, 'nameAvailableCheck']);

/**
 * Records. CRU
 */
Route::middleware('auth:api')->group(function () {
    Route::get('/records', [RecordController::class, 'index']);
    Route::post('/records', [RecordController::class, 'store']);
});
