<?php 
        error_reporting(E_ALL);
        ini_set('error_log', 'error_log.txt');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers:*");
        header("Content-Type:JSON");
        $response = array("status"=>"0", "result"=>"result");
        $con = mysqli_connect("localhost","root","","project");
?>