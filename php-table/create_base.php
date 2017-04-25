<?php
     $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', 'websoft9')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }

    $mysqli->set_charset("utf8");
    $sql="CREATE DATABASE cangku2";
    $result = $mysqli->query($sql);
    $mysqli->close();

?>
