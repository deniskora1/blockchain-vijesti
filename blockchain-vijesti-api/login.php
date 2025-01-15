<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Povezivanje s bazom podataka
$host = 'localhost';
$db = 'blockchain_vijesti';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Dohvatanje podataka iz POST zahteva
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Username and password are required']);
    exit;
}

$username = $data['username'];
$password = $data['password'];

try {
    // Provera korisnika u bazi
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['password'] === $password) {
        // Uspešan login
        unset($user['password']); // Uklanjanje lozinke iz odgovora
        echo json_encode(['user' => $user]);
    } else {
        // Pogrešni podaci za login
        echo json_encode(['error' => 'Invalid credentials']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
?>
