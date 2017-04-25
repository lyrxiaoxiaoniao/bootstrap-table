<?php
    $userName=$_POST['uname'];
    $password=$_POST['pwd'];

    $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', 'websoft9', 'cangku2')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
    }

    if ($mysqli->set_charset("utf8")) {

        $q = "SELECT * FROM user WHERE userName='$userName' AND passWord='$password'";

        // 查询
        $result = $mysqli->query($q);
        $arr=[];
        $i=0;
        if ($result = $mysqli->query($q)) {
        while ($obj = $result->fetch_object()) {
            $arr[$i++]=$obj;//把结果遍历到数组中

        }
            echo json_encode($arr);
         /* free result set 关闭结果集*/
         $result->close();

        }
    }
    $mysqli->close();

 ?>

