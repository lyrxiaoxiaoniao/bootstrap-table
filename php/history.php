<?php
    $classVal=$_POST['class_val'];
    $nameVal=$_POST['name_val'];
    $numVal=$_POST['num_val'];
    $rec=$_POST['rec'];
    $currentTime=$_POST['current_time'];
    $mysqli = mysqli_init();
        if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', '', 'cangku')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }
    $mysqli->set_charset("utf8");

    if ($mysqli->set_charset("utf8")) {

        if($rec=="历史记录"){
            if($nameVal==""){
                $q = "SELECT * FROM history WHERE class='$classVal'";
            }else if($classVal==""){
                $q = "SELECT * FROM history WHERE name='$nameVal'";
            }else{
                $q = "SELECT * FROM history WHERE class='$classVal' AND name='$nameVal'";
            }
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
        }else {
            if($classVal&&$nameVal&&$numVal&&$rec){
                //往历史记录的表格里添加数据
                $q = "INSERT INTO history (class, name, num, currentTime, operate) VALUES ('$classVal','$nameVal','$numVal','$currentTime','$rec')";
                $result = $mysqli->query($q);//执行上面的额添加语句

            }else{
                $q = "SELECT * FROM history";//搜索表单
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
            }
        }

    } else {

        printf("Error loading character set utf8: %s\n", $mysqli->error);
    }

     $mysqli->close();//关闭数据库
 ?>