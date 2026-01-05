<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/current-user', function () {
        return auth()->user();
    });
});

// Routes API PUBLIQUES (avant la catch-all)
Route::get('/app/products', [ProductController::class, 'index']);
Route::get('/app/products/{product}', [ProductController::class, 'show']);
Route::get('/app/categories', [CategoryController::class, 'index']);
Route::get('/app/categories/{category}', [CategoryController::class, 'show']);
Route::get('/app/users', [UserController::class, 'index']);
Route::get('/app/users/{user}', [UserController::class, 'show']);

// Routes API PROTÉGÉES
Route::middleware('auth')->group(function () {
    Route::post('/app/products', [ProductController::class, 'store']);
    Route::put('/app/products/{product}', [ProductController::class, 'update']);
    Route::patch('/app/products/{product}', [ProductController::class, 'update']);
    Route::delete('/app/products/{product}', [ProductController::class, 'destroy']);

    Route::post('/app/categories', [CategoryController::class, 'store']);
    Route::put('/app/categories/{category}', [CategoryController::class, 'update']);
    Route::patch('/app/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/app/categories/{category}', [CategoryController::class, 'destroy']);

    Route::put('/app/users/{user}', [UserController::class, 'update']);
    Route::patch('/app/users/{user}', [UserController::class, 'update']);
    Route::delete('/app/users/{user}', [UserController::class, 'destroy']);
});

require __DIR__ . '/auth.php';

// Routes de l'application React - capture toutes les routes sous /app (DOIT être à la fin)
Route::get('/app/{any?}', function () {
    return view('app');
})->where('any', '.*');

