<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\HistoryPointController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\RankController;
// Route mặc định
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Nhóm route cho ADMIN
Route::prefix('admin')->group(function () {
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index']);
        Route::post('/create', [CustomerController::class, 'store']);
        Route::get('/{id}', [CustomerController::class, 'show']);
        Route::put('/{id}', [CustomerController::class, 'update']);
        Route::delete('/{id}', [CustomerController::class, 'delete']);
    });

    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingController::class, 'index']);
        Route::post('/create', [BookingController::class, 'store']);
        Route::get('/{id}', [BookingController::class, 'show']);
        Route::put('/{id}', [BookingController::class, 'update']);
        Route::delete('/{id}', [BookingController::class, 'delete']);
    });

    Route::prefix('invoices')->group(function () {
        Route::get('/', [InvoiceController::class, 'index']);
        Route::post('/create', [InvoiceController::class, 'store']);
        Route::get('/{id}', [InvoiceController::class, 'show']);
        Route::put('/{id}', [InvoiceController::class, 'update']);
        Route::delete('/{id}', [InvoiceController::class, 'delete']);
    });

    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/create', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });

    Route::prefix('history-points')->group(function () {
        Route::get('/', [HistoryPointController::class, 'index']);
        Route::post('/create', [HistoryPointController::class, 'store']);
        Route::get('/{id}', [HistoryPointController::class, 'show']);
        Route::put('/{id}', [HistoryPointController::class, 'update']);
        Route::delete('/{id}', [HistoryPointController::class, 'destroy']);
    });

    Route::prefix('ranks')->group(function () {
        Route::get('/', [RankController::class, 'index']);
        Route::post('/create', [RankController::class, 'store']);
        Route::get('/{id}', [RankController::class, 'show']);
        Route::put('/{id}', [RankController::class, 'update']);
        Route::delete('/{id}', [RankController::class, 'destroy']);
    });
});

// Nhóm route cho CLIENT
Route::prefix('client')->group(function () {});
