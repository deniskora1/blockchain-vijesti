<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$db = 'blockchain_vijesti';
$user = 'root';
$pass = '';

$baseImageUrl = 'http://localhost/blockchain-vijesti-api/slike/';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        SELECT 
            id, 
            title, 
            content, 
            author, 
            DATE_FORMAT(date, '%d.%m.%Y') AS date,
            CASE 
                WHEN image_url LIKE 'http%' THEN image_url -- Ako je već pun URL, koristi ga
                WHEN image_url IS NOT NULL AND image_url != '' THEN CONCAT('$baseImageUrl', image_url) -- Dodaj bazni URL
                ELSE '$baseImageUrl/default.jpg' -- Postavi zadanu sliku ako je image_url prazan
            END AS image_url
        FROM news 
        WHERE recommended = 1 
        ORDER BY date DESC 
        LIMIT 5
    ");
    $stmt->execute();
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($news);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
