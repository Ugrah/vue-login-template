<?php

$status = 200;
$response = [];

$error = [];

$data = json_decode(file_get_contents('php://input'), true);

if( empty($data['username']) ) $error[] = 'Please put your username';
if( empty($data['password']) ) $error[] = 'Please put your password';

if(!count($error)) {
    $data['id'] = random_int(1000, 9999);
    unset( $data['password'] );
    $response['data'] = $data;
}

// To dev test

http_response_code($status);
header('Content-Type: application/json');
echo json_encode($response);