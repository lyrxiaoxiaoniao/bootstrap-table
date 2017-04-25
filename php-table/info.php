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
        //查询数据库里面,
        //把num属性小于5的给弄出来.放入一个对象。
        $arr=[];
        $i=0;
        if ($result = $mysqli -> query($sql)) {
            while ( $obj = $result->fetch_object() ) {
               if($obj->num < 5){
                 $arr[$i++]=$obj;
               }
            }
            echo json_encode($arr);
            $result->close(); /* free result set 关闭结果集*/
        }
    }
    $mysqli->close();

 ?>
