<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Database connection parameters
$host = 'localhost';
$db = 'blockchain_vijesti';
$user = 'root';
$pass = '';

// API base URL for images
$baseImageUrl = 'http://localhost/blockchain-vijesti-api/slike/';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch the latest 10 news items with valid image URLs
    $stmt = $pdo->query("
        SELECT 
            id, 
            title, 
            content, 
            author, 
            DATE_FORMAT(date, '%d.%m.%Y') AS date,
            CASE 
                WHEN image_url LIKE 'http%' THEN image_url  -- Ako URL već sadrži 'http', koristi ga direktno
                WHEN image_url IS NOT NULL AND image_url != '' THEN CONCAT('$baseImageUrl', image_url)  -- Ako nije prazan, dodaj bazni URL
                ELSE NULL  -- Ako je prazan ili NULL, postavi na NULL
            END AS image_url
        FROM news 
        ORDER BY date DESC 
        LIMIT 10
    ");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return JSON response
    echo json_encode($news);
} catch (PDOException $e) {
    // Return an error message in JSON format
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
