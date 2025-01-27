<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ExamController extends Controller
{
    public $exams = [];
    public $categories = [];
    public $selectedCategory = "All";
    public $searchQuery = "";
    public $filterCandidateName = "";
    public $filterStartDate = "";
    public $filterEndDate = "";
    public $showFilters = false;
    public $selectedExam = null;
    public $loading = false;
    public $showAddModal = false;
    public $isEdit = false;
    public $errors = [];
    public $newCard = [
        'Title' => '',
        'Description' => '',
        'CandidateName' => '',
        'Date' => '',
        'LocationName' => '',
        'Latitude' => '',
        'Longitude' => '',
    ];

    public function __construct()
    {
        $this->fetchData();
    }

    public function fetchData()
    {
        // local PHP server
        // "http://localhost/vic-php-api/api/exam/exams.php",

        // API server
        // "https://victvs-exam.futsalify.com/api/exam/exams.php",
        try {
            $response = Http::post('https://victvs-exam.futsalify.com/api/exam/exams.php', [
                'authCode' => 'your_secure_auth_victvs',
            ]);

            if ($response->failed()) {
                throw new \Exception('Network response was not ok');
            }

            $data = $response->json();
            $this->exams = $data['Exams'];
            $this->categories =  array_unique(array_column($data['Exams'], 'LocationName'));
        } catch (\Exception $e) {
            // Handle the error
            \Log::error('Error fetching data: ' . $e->getMessage());
        }
    }

    public function index()
    {
        return view('exam', [
            'exams' => $this->exams,
            'categories' => $this->categories,
            'selectedCategory' => $this->selectedCategory,
            'searchQuery' => $this->searchQuery,
            'filterCandidateName' => $this->filterCandidateName,
            'filterStartDate' => $this->filterStartDate,
            'filterEndDate' => $this->filterEndDate,
            'showFilters' => $this->showFilters,
            'selectedExam' => $this->selectedExam,
            'loading' => $this->loading,
            'showAddModal' => $this->showAddModal,
            'isEdit' => $this->isEdit,
            'errors' => $this->errors,
            'newCard' => $this->newCard,
        ]);
    }
}
