<?php
    // $classVal=$_POST['class_val'];
    // $nameVal=$_POST['name_val'];
    $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', '', 'cangku')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }
    $mysqli->set_charset("utf8");
    header('content-type:application/msexcel');
    header('content-disposition:filename=file001.xls');
     //查询数据
    $q = "SELECT * FROM product";

    //执行查询语句
    $result = $mysqli->query($q);
    $arr=[];
    $i=0;
    if ($result = $mysqli->query($q)) {
        while ($row = $result->fetch_row()) {
            $arr[$i++]=$row;//把结果遍历到数组中

        }
            echo json_encode($arr);
         /* free result set 关闭结果集*/
         $result->close();
    }

    $mysqli->close();
 ?>
