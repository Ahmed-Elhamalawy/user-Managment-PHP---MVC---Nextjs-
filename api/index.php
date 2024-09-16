<?php
// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}



// Autoload classes
spl_autoload_register(function ($class_name) {
    $file = str_replace('\\', '/', $class_name) . '.php';
    if (file_exists($file)) {
        require $file;
    }
});

// Route the request
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

$controller = new controllers\UserController();

if (preg_match('/^\/api\/users(\/(\d+))?/', $request_uri, $matches)) {
    $id = isset($matches[2]) ? $matches[2] : null;
    
    switch ($request_method) {
        case 'GET':
            echo $id ? $controller->getUser($id) : $controller->getAllUsers();
            break;
        case 'POST':
            echo $controller->createUser();
            break;
        case 'PUT':
            echo $controller->updateUser($id);
            break;
        case 'DELETE':
            echo $controller->deleteUser($id);
            break;
        default:
            http_response_code(405);
            echo json_encode(['status' => 0, 'message' => 'Method Not Allowed']);
    }
} else {
    http_response_code(404);
    echo json_encode(['status' => 0, 'message' => 'Not Found']);
}