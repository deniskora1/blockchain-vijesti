<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

error_log("Primljeni podaci: " . file_get_contents("php://input"));

include_once 'config.php';

// Decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id) &&
    !empty($data->title) &&
    !empty($data->content) &&
    !empty($data->category) &&
    !empty($data->image_url)
) {
    $query = "UPDATE news SET title = :title, content = :content, category = :category, image_url = :image_url WHERE id = :id";

    $stmt = $pdo->prepare($query);

    // Bind parameters
    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':content', $data->content);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':image_url', $data->image_url);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["message" => "Vijest je uspješno ažurirana."]);
    } else {
        echo json_encode(["message" => "Došlo je do greške prilikom ažuriranja vijesti."]);
    }
} else {
    echo json_encode(["message" => "Svi podaci moraju biti dostavljeni."]);
}
?>
