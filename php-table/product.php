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

    if ($mysqli->set_charset("utf8")) {
         //添加到历史记录表单里；
            $q = "INSERT INTO history (class, name, num, currentTime, operate, people) VALUES ('$classVal','$nameVal','$numVal','$currentTime','$rec','$peopleVal')";
            $result = $mysqli->query($q);//执行上面的额添加语句

        if($rec=="修改"){

            $sql = "SELECT * FROM product";//搜索表单
            $result = $mysqli->query($sql);
            //判断数据库中是否有添加的商品,
            //如果有就把数量相加.
            //如果没有就重新添加商品
            if ($result = $mysqli->query($sql)) {
                while ( $row = $result->fetch_row() ) {
                    if( $idVal==$row[0]){
                        $numVal=$numVal+$row[3];
                    }
                }
                $result->close(); /* free result set 关闭结果集*/
            }

            //更新修改
            $q="UPDATE product SET class ='$classVal' , name='$nameVal', num='$numVal' ,currentTime='$currentTime',people='$peopleVal' WHERE id ='$idVal'";
            $result = $mysqli->query($q);//执行上面的更新语句

        }else if($rec=="商品入库"){
            $sql = "SELECT * FROM product";//搜索表单
            $result = $mysqli->query($sql);
            //判断数据库中是否有添加的商品,
            //如果有就把数量相加.
            //如果没有就重新添加商品
            if ($result = $mysqli->query($sql)) {
                while ( $row = $result->fetch_row() ) {
                    if( $classVal == $row[1] && $nameVal == $row[2] ){
                        $numVal=$numVal+$row[3];
                        $idVal=$row[0];
                    }
                }
                $result->close(); /* free result set 关闭结果集*/
            }
            if($idVal){//如果页面获取到了ID
                $q="UPDATE product SET class ='$classVal' , name='$nameVal', num='$numVal',currentTime='$currentTime',people='$peopleVal' WHERE id ='$idVal'";
                $result = $mysqli->query($q);//执行上面的更新语句
            }else{
                $q = "INSERT INTO product (class, name, num, currentTime, people) VALUES ('$classVal','$nameVal','$numVal','$currentTime','$peopleVal')";
                $result = $mysqli->query($q);//执行上面的额添加语句
            }
        }

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

    } else {

        printf("Error loading character set utf8: %s\n", $mysqli->error);
    }

     $mysqli->close();//关闭数据库
 ?>