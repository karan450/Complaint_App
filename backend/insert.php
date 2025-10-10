<?php 

        include("./index.php");
        
        $data = json_decode(file_get_contents('php://input'));

        if(isset($data->username) && isset($data->password)){
            if(doesUserExist($con, $data->username)){
                $response["status"] = "2";
                $response["result"] = "User already exist";
                echo json_encode($response);
            }else{
                $stmt = $con->prepare("insert into userdata values (?, ?, ?)");

                $stmt->bind_param("sss",$data->username,$data->password,$data->phoneno);
                if($stmt->execute()){
                    $response["status"] = "1";
                    $response["result"] = "Inserted successfully";
                    echo json_encode($response);
                } else {
                    $response["status"] = "-1";
                    $response["result"] = "some error occurred while inserting";
                    echo json_encode($response);
                }
            }
        }


        //function checks if user exist
        // argument 1 takes the connection and 
        // argument 2 takes the username for checking into database
        // if user does exist then it will return true
        function doesUserExist($con, $username){
            $stmt = $con->prepare("select * from userdata where ? like username");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $user = $stmt->fetch();
            if(isset($user) && !empty($user)){
                return true;
            }else{
                return false;
            }
        }
        
        $con->close();
?>