<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\enController;

/*
 * Root route - displays welcome page
 *
Route::get('/', function () {
    return view('welcome');
});

 */

Route::get('/', [enController::class, 'home']);
Route::get('/search', [enController::class, 'searchResults']);
Route::get('/online-courses', [enController::class, 'onlineCourses']);
Route::get('/about-us', [enController::class, 'aboutUs']);
Route::get('/support-us', [enController::class, 'supportUs']);
Route::get('/privacy-policy', [enController::class, 'privacyPolicy']);
Route::get('/community-guide', [enController::class, 'communityGuide']);
Route::get('/AI-transparency', [enController::class, 'useTransparency']);
Route::get('/update-logs', [enController::class, 'updates']);
