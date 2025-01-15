<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$db = 'blockchain_vijesti';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['date'])) {
        $date = $_GET['date'];
        $stmt = $pdo->prepare('SELECT id, title, content, author, date FROM news WHERE DATE(date) = :date ORDER BY date DESC');
        $stmt->bindParam(':date', $date);
    } else {
        $stmt = $pdo->prepare('SELECT id, title, content, author, date FROM news ORDER BY date DESC LIMIT 5');
    }

    $stmt->execute();
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($news);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
