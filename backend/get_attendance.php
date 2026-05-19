<?php
  include 'db.php';

  $result = mysqli_query($conn, "
    SELECT pengguna.nama, attendance.tanggal 
    FROM attendance 
    JOIN pengguna ON pengguna.id = attendance.pengguna_id
  ");

  $data = [];

  while ($row = mysqli_fetch_assoc($result)) {
      $data[] = $row;
  }

  echo json_encode($data);
?>