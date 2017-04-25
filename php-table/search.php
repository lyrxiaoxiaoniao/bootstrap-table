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

        $sql = "SELECT * FROM product";//搜索表单
        $result = $mysqli->query($sql);
        //判断数据库中是否有添加的商品,
        //如果有就把数量相加.
        //如果没有就重新添加商品
        $arr=[];
        $i=0;
        if ($result = $mysqli->query($sql)) {
            while ( $row = $result->fetch_row() ) {
                $arr[$i++]=$row;
            }
            echo json_encode($arr);
            $result->close(); /* free result set 关闭结果集*/
        }
    }
    $mysqli->close();

 ?>
