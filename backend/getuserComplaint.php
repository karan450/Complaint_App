<?php 
    include("./index.php");
    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->username)){

        $result = mysqli_query($con, "SELECT * FROM water WHERE username = '".$data->username."'");
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

        $result1 = mysqli_query($con, "SELECT * FROM electricity WHERE username = '".$data->username."'");
        $rows1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);

        $result2 = mysqli_query($con, "SELECT * FROM waste WHERE username = '".$data->username."'");
        $rows2 = mysqli_fetch_all($result2, MYSQLI_ASSOC);

        $result3 = mysqli_query($con, "SELECT * FROM pothole WHERE username = '".$data->username."'");
        $rows3 = mysqli_fetch_all($result3, MYSQLI_ASSOC);

        $result4 = mysqli_query($con, "SELECT * FROM streetlight WHERE username = '".$data->username."'");
        $rows4 = mysqli_fetch_all($result4, MYSQLI_ASSOC);
        
        $mergedRows = array_merge($rows, $rows1, $rows2, $rows3, $rows4);
        echo json_encode($mergedRows);
    }


?>