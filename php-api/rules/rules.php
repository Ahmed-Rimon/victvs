<?php
// require_once '../.env';
function authenticate($authCode)
{
    $validAuthCode = 'your_secure_auth_victvs';
    // $validAuthCode = $_ENV['SECURE_AUTH_CODE'];
    return hash_equals($validAuthCode, $authCode);
}

function validateRequest($request)
{
    if (!isset($request['authCode']) || !is_string($request['authCode']) || empty($request['authCode'])) {
        return false;
    }
    return true;
}

function sanitizeInput($data)
{
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags($data));
}

function handleRequest($request, $callback)
{
    if (!validateRequest($request)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request']);
        exit;
    }

    $request['authCode'] = sanitizeInput($request['authCode']);

    if (!authenticate($request['authCode'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $callback($request);
}

function validateExamFields($exam)
{
    $requiredFields = ['Title', 'Description', 'Candidateid', 'CandidateName', 'Date', 'LocationName', 'Latitude', 'Longitude'];
    $missingFields = [];

    foreach ($requiredFields as $field) {
        if (!isset($exam[$field]) || empty($exam[$field])) {
            $missingFields[] = $field;
        }
    }

    if (!empty($missingFields)) {
        return ['valid' => false, 'missingFields' => $missingFields];
    }

    return ['valid' => true];
}
