<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once '../../rules/rules.php';

$request = json_decode(file_get_contents('php://input'), true);

if ($request === null) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid JSON input']);
  exit;
}

handleRequest($request, function ($request) {
  $jsonString = file_get_contents('../../exam/TechTestJson.json');
  if ($jsonString === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error reading JSON file']);
    exit;
  }

  $examsArray = json_decode($jsonString, true);
  if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Error decoding JSON file']);
    exit;
  }

  $examsArray['status'] = 'success';
  $examsArray['message'] = 'Exams fetched successfully';
  $examsArray['title'] = 'Exams';
  $examsArray['description'] = 'List of exams';

  http_response_code(200);
  echo json_encode($examsArray);
});
