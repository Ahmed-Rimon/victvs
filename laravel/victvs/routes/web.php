<?php

use App\Http\Controllers\ExamController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('exam');
// });

Route::get('/', [ExamController::class, 'index']);
Route::post('/exam/fetch', [ExamController::class, 'fetchData']);
Route::post('/exam/add', [ExamController::class, 'addExam'])->name('addExam');
Route::post('/exam/edit/{id}', [ExamController::class, 'editExam'])->name('editExam');
Route::delete('/exam/delete/{id}', [ExamController::class, 'deleteCard'])->name('deleteExam');
Route::get('/exam/show/{id}', [ExamController::class, 'showExam'])->name('showExam');
Route::get('/exam/details/{id}', [ExamController::class, 'getExamDetails'])->name('getExamDetails');
