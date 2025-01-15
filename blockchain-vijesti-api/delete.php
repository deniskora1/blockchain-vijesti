<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $query = "DELETE FROM news WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $data->id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Vijest uspješno obrisana."]);
    } else {
        echo json_encode(["message" => "Došlo je do greške prilikom brisanja vijesti."]);
    }
} else {
    echo json_encode(["message" => "ID vijesti nije dostavljen."]);
}
?>
