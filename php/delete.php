<?php
    $id=$_POST['id'];

    $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', '', 'cangku')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }
    $mysqli->set_charset("utf8");

    $q="DELETE FROM product WHERE id='$id'";

    $result = $mysqli->query($q);
    echo $result;

    $mysqli->close();
?>