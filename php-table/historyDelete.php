<?php

    $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', 'websoft9', 'cangku2')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
    }

    if ($mysqli->set_charset("utf8")) {

        $sql = "truncate table history";//清空表数据
        $result = $mysqli->query($sql);
        echo $result;
    }
    $mysqli->close();

 ?>
