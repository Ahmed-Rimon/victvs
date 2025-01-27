<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require_once '../rules/rules.php';



$request = json_decode(file_get_contents('php://input'), true);

handleRequest($request, function ($request) {
    $jsonString = file_get_contents('../exam/TechTestJson.json');
    $examsArray = json_decode($jsonString, true);

    $newExam = sanitizeInput($request['exam']);

    // Validate required fields
    $validationResult = validateExamFields($newExam);
    if (!$validationResult['valid']) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields', 'missingFields' => $validationResult['missingFields']]);
        return;
    }

    // Check if the exam already exists
    foreach ($examsArray['Exams'] as $exam) {
        if ($exam['id'] == $newExam['id']) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Exam already exists']);
            return;
        }
    }

    $newExam['id'] = end($examsArray['Exams'])['id'] + 1;
    $examsArray['Exams'][] = $newExam;

    file_put_contents('../exam/TechTestJson.json', json_encode($examsArray));

    http_response_code(201);
    echo json_encode(['status' => 'success', 'message' => 'Exam added successfully']);
});
