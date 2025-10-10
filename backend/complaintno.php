<?php 
    include("./index.php");
    $data = json_decode(file_get_contents('php://input'));

    if(isset($data->username)){

        $result = mysqli_query($con, "SELECT id FROM water WHERE username = '".$data->username."'");
        $result1 = mysqli_query($con, "SELECT id FROM electricity WHERE username = '".$data->username."'");
        $result2 = mysqli_query($con, "SELECT id FROM waste WHERE username = '".$data->username."'");
        $result3 = mysqli_query($con, "SELECT id FROM pothole WHERE username = '".$data->username."'");
        $result4 = mysqli_query($con, "SELECT id FROM streetlight WHERE username = '".$data->username."'");

        $a = mysqli_query($con, "SELECT id FROM water WHERE status = '".$data->status."' AND username = '".$data->username."'");
        $b = mysqli_query($con, "SELECT id FROM electricity WHERE status = '".$data->status."' AND username = '".$data->username."'");
        $c = mysqli_query($con, "SELECT id FROM waste WHERE status = '".$data->status."' AND username = '".$data->username."'");
        $d = mysqli_query($con, "SELECT id FROM pothole WHERE status = '".$data->status."' AND username = '".$data->username."'");
        $e = mysqli_query($con, "SELECT id FROM streetlight WHERE status = '".$data->status."' AND username = '".$data->username."'");

        $count = mysqli_num_rows($result);
        $count1 = mysqli_num_rows($result1);
        $count2 = mysqli_num_rows($result2);
        $count3 = mysqli_num_rows($result3);
        $count4 = mysqli_num_rows($result4);

        $s = mysqli_num_rows($a);
        $s1 = mysqli_num_rows($b);
        $s2 = mysqli_num_rows($c);
        $s3 = mysqli_num_rows($d);
        $s4 = mysqli_num_rows($e);
        
        $sumofall = $count + $count1 + $count2 + $count3 + $count4;
        $sumofresolved = $s + $s1 + $s2 + $s3 + $s4;
        $answer = array();
        $answer["sumofall"] = $sumofall;
        $answer["sumofresolved"] = $sumofresolved;
        echo json_encode($answer);
    }


?>