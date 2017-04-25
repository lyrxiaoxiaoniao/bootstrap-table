<?php
    $classVal=$_POST['class_val'];
    $nameVal=$_POST['name_val'];
    $numVal=$_POST['num_val'];
    $rec=$_POST['rec'];
    $currentTime=$_POST['current_time'];
    $idVal=$_POST['id_val']; //获取ID
    $peopleVal=$_POST['people_val']; //获取ID

    $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', 'websoft9', 'cangku2')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }
    $mysqli->set_charset("utf8");
    //添加到历史记录表单里；
    $q = "INSERT INTO history (class, name, num, currentTime, operate, people) VALUES ('$classVal','$nameVal','$numVal','$currentTime','$rec','$peopleVal')";
    $result = $mysqli->query($q);//执行上面的额添加语句

    $q="DELETE FROM product WHERE id='$idVal'";

    $result = $mysqli->query($q);

    $q = "SELECT * FROM product";//搜索表单

     // 查询
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
