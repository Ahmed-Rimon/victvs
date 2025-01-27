<?php

require_once '../rules/rules.php';

header('Content-Type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

handleRequest($request, function ($request) {
    $jsonString = file_get_contents('../exam/TechTestJson.json');
    $examsArray = json_decode($jsonString, true);

    $updatedExam = sanitizeInput($request['exam']);

    // Validate required fields
    $validationResult = validateExamFields($updatedExam);
    if (!$validationResult['valid']) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields', 'missingFields' => $validationResult['missingFields']]);
        return;
    }

    $examId = $updatedExam['id'];

    foreach ($examsArray['Exams'] as &$exam) {
        if ($exam['id'] == $examId) {
            $exam = array_merge($exam, $updatedExam);
            break;
        }
    }

    file_put_contents('../exam/TechTestJson.json', json_encode($examsArray));

    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Exam updated successfully']);
});
