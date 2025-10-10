<?php

// complaintType is basically the table name.

// Function to generate a new complaint ID
function generateComplaintId($complaintType) {
  // Get the current date and time
  $currentDateTime = date('YmdHis');

  // Generate a random number between 1000 and 9999
  $randomNumber = rand(1000, 9999);

  // Combine the current date/time, the random number, and the complaint type
  $complaintId = $currentDateTime . $randomNumber . substr($complaintType, 0, 2);

  $result = checkComplaintIdExists($complaintId, $complaintType);
  if($result){
    $complaintId = generateComplaintId($complaintType);
    return $complaintId;
  }else{
    return $complaintId;
  }
}

// Function to check if a complaint ID already exists in the database
function checkComplaintIdExists($complaintId, $complaintType) {
  // Connect to the database
  include("./index.php");

  $query = "SELECT id FROM " . $complaintType . " WHERE complaint_id = '" . $complaintId . "'";

  $result = mysqli_query($conn, $query);

  // Check if any rows were returned
  if (mysqli_num_rows($result) > 0) {
    return false;
  } else {
    return true;
  }

  mysqli_close($conn);
}

