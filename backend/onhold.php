<?php 
    include("./index.php");
    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->status)){

        $stmt = $con->prepare("update ".$data->table." set status = '".$data->status."' where id = '".$data->id."'");
        if($stmt->execute()){
            $response["status"] = "1";
            $response["result"] = "Successfully changed";
            echo json_encode($response);
        }
    }
    $con->close();
?>