<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserBookController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartBookController;
use App\Http\Controllers\API\AuthController;


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


Route::get('/users', [UserController::class, 'index']);

Route::resource('/books', BookController::class)->only(['index','show']);
Route::resource('users.books', UserBookController::class)->only(['index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::group(['middleware' => ['auth:sanctum', 'CheckRole']], function(){
        Route::resource('/books', BookController::class)->only(['update','store','destroy']);
        Route::get('/users/{id}', [UserController::class, 'show']);
    });

    Route::group(['middleware' => ['auth:sanctum', 'CheckUser']], function(){
        Route::resource('/cart', CartBookController::class)->only(['index','update','store','destroy','show']);
    });

    // API route for logout user
    Route::post('/logout', [AuthController::class, 'logout']);
});