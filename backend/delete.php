<?php 
    include("./index.php");
    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->status)){

        $stmt = $con->prepare("delete from ".$data->table." where id = '".$data->id."'");
        if($stmt->execute()){
            $response["status"] = "1";
            $response["result"] = "Successfully deleted";
            echo json_encode($response);
        }
    }


?>