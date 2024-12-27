<?php
// Set header to allow cross-origin requests (for development only)
// Remove in production if not necessary
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// Database connection details
$host = 'localhost'; // Database host
$dbname = 'test'; // Database name
$username = 'root'; // Database username
$password = 'oussama2002'; // Database password

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"));

// Validate input data
if (!isset($data->fullName) || !isset($data->username) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(['message' => 'Please fill all fields.']);
    exit;
}

$fullName = htmlspecialchars($data->fullName);
$username = htmlspecialchars($data->username);
$email = htmlspecialchars($data->email);
$password = password_hash($data->password, PASSWORD_DEFAULT); // Hash the password

// Check if the username already exists
$sql = "SELECT id FROM signin WHERE username = :username";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':username', $username);
$stmt->execute();

// If the username exists, return an error message
if ($stmt->rowCount() > 0) {
    echo json_encode(['message' => 'Username already taken. Please choose another one.']);
    exit;
}

// Check if the email already exists
$sqlEmail = "SELECT id FROM signin WHERE email = :email";
$stmtEmail = $pdo->prepare($sqlEmail);
$stmtEmail->bindParam(':email', $email);
$stmtEmail->execute();

// If the email exists, return an error message
if ($stmtEmail->rowCount() > 0) {
    echo json_encode(['message' => 'Email is already registered. Please use another one.']);
    exit;
}

// SQL query to insert data into the users table
$sqlInsert = "INSERT INTO signin (fullname, username, email, password) VALUES (:full_name, :username, :email, :password)";
try {
    $stmtInsert = $pdo->prepare($sqlInsert);
    $stmtInsert->bindParam(':full_name', $fullName);
    $stmtInsert->bindParam(':username', $username);
    $stmtInsert->bindParam(':email', $email);
    $stmtInsert->bindParam(':password', $password);

    // Execute the query
    if ($stmtInsert->execute()) {
        echo json_encode(['message' => 'User registered successfully']);
    } else {
        echo json_encode(['message' => 'Failed to register user']);
    }
} catch (PDOException $e) {
    echo json_encode(['message' => 'Error: ' . $e->getMessage()]);
}
?>
