<?php 

    include("./index.php");


    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->username)){
    $username = $data->username;
    $status  = "sent";
    }else{
        $response["status"] = "2";
        $response["result"] = "USER NOT FOUND";
        echo json_encode($response);
    }
    if(isset($data->fullName)){
        $stmt = $con->prepare("INSERT INTO water (fullname, email, phonenumber, pincode, usertime, address, description, status, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param(
            "sssssssss",
            $data->fullName,
            $data->email,
            $data->phoneNo,
            $data->pincode,
            $data->usertime,
            $data->address,
            $data->description,
            $status,
            $username
        );
        if($stmt->execute()){
            $response["status"] = "1";
            $response["result"] = "Inserted successfully";
            echo json_encode($response);
        } else {
            $response["status"] = "-1";
            $response["result"] = "some error occurred while inserting";
            echo json_encode($response);
        }
    }else{
        
        $response["status"] = "3";
        $response["result"] = "FULLNAME CAN'T BE NULL";
    }

        
        
        $con->close();
?>