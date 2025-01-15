<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->content) &&
    !empty($data->author) &&
    !empty($data->date) &&
    !empty($data->image_url) &&
    !empty($data->category)
) {
    $query = "INSERT INTO news (title, content, author, date, image_url, category, recommended)
              VALUES (:title, :content, :author, :date, :image_url, :category, :recommended)";

    $stmt = $db->prepare($query);

    // Bindovanje parametara
    $stmt->bindParam(":title", $data->title);
    $stmt->bindParam(":content", $data->content);
    $stmt->bindParam(":author", $data->author);
    $stmt->bindParam(":date", $data->date);
    $stmt->bindParam(":image_url", $data->image_url);
    $stmt->bindParam(":category", $data->category);
    $recommended = isset($data->recommended) ? $data->recommended : 0;
    $stmt->bindParam(":recommended", $recommended);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Vijest uspješno dodana."]);
    } else {
        echo json_encode(["message" => "Greška prilikom dodavanja vijesti.", "error" => $stmt->errorInfo()]);
    }
} else {
    echo json_encode(["message" => "Svi podaci su obavezni."]);
}
?>
