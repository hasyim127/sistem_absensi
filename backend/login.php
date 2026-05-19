<?php
  include 'db.php';

  $username = $_POST['username'];
  $password = $_POST['password'];

  $query = mysqli_query($conn, "SELECT * FROM pengguna WHERE username='$username'");

  $user = mysqli_fetch_assoc($query);

  if ($user && $user['password'] == $password) {
      echo json_encode(["status" => "success"]);
  } else {
      echo json_encode(["status" => "error"]);
  }
?>