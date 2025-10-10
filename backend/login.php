<?php 

        include("./index.php");
        

        $data = json_decode(file_get_contents('php://input'));

        $stmt = $con->prepare("select * from userdata where ? like username AND ? like password");
            $stmt->bind_param("ss", $data->username, $data->password);
            $stmt->execute();
            $user = $stmt->fetch();
            if(isset($user) && !empty($user)){
                $response["status"] = "1";
                $response["result"] = "USERNAME AND PASSWORD MATCH";
                echo json_encode($response);
            }else{
                $response["status"] = "-1";
                $response["result"] = "DOES NOT MATCH";
                echo json_encode($response);
            }
        $con->close();
?>