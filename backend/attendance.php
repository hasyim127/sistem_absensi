<?php
  include 'db.php';

  $user_id = $_POST['user_id'];
  $date = date('Y-m-d');

  mysqli_query($conn, "INSERT INTO attendance (pengguna_id, tanggal, status) 
  VALUES ('$user_id', '$date', 'present')");

  echo json_encode(["status" => "success"]);
?>