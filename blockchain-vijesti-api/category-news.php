<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$db = 'blockchain_vijesti';
$user = 'root';
$pass = '';

$category = isset($_GET['category']) ? $_GET['category'] : '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Priprema upita s kategorijom
    $stmt = $pdo->prepare('SELECT id, title, content, author, date, image_url 
                           FROM news 
                           WHERE category = :category 
                           ORDER BY date DESC');
    $stmt->bindParam(':category', $category, PDO::PARAM_STR);
    $stmt->execute();

    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($news);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
