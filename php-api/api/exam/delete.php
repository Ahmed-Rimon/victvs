<?php

require_once '../rules/rules.php';

header('Content-Type: application/json');

$request = json_decode(file_get_contents('php://input'), true);

handleRequest($request, function ($request) {
    $jsonString = file_get_contents('../exam/TechTestJson.json');
    $examsArray = json_decode($jsonString, true);

    $examId = sanitizeInput($request['exam']['id']);

    $examsArray['Exams'] = array_filter($examsArray['Exams'], function ($exam) use ($examId) {
        return $exam['id'] != $examId;
    });

    file_put_contents('../exam/TechTestJson.json', json_encode($examsArray));

    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Exam deleted successfully']);
});
