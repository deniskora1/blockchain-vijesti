<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// Provjera podataka
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'error' => 'Polja ne mogu biti prazna.']);
    exit;
}
$conn = new mysqli('localhost', 'root', '', 'blockchain_vijesti');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Greška prilikom povezivanja s bazom.']);
    exit;
}

// Provjera da li korisnik vec postoji
$query = $conn->prepare('SELECT * FROM users WHERE username = ?');
$query->bind_param('s', $username);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'error' => 'Korisničko ime već postoji.']);
    exit;
}

// Unos novog korisnika
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$query = $conn->prepare('INSERT INTO users (username, password, role) VALUES (?, ?, "user")');
$query->bind_param('ss', $username, $passwordHash);

if ($query->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Greška prilikom registracije.']);
}
?>
