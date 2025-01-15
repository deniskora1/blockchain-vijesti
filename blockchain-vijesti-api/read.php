<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "blockchain_vijesti");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if (isset($_GET['id'])) {
    $newsId = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM news WHERE id = ?");
    $stmt->bind_param("i", $newsId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $news = $result->fetch_assoc();
        echo json_encode($news);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Vijest nije pronađena"]);
    }

    $stmt->close();
} else {
    $sql = "SELECT * FROM news";
    $result = $conn->query($sql);

    $news = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $news[] = $row;
        }
    }

    echo json_encode($news);
}

$conn->close();
?>
