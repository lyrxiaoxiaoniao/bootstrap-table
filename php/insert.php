

<?php

    $uname=$_GET["uname"];
    $pwd=$_GET["pwd"];

    $con = mysql_connect("localhost","root","");
    if (!$con){
      die('Could not connect: ' . mysql_error());
    }
    $mysqli->set_charset("utf8");
    mysql_select_db("cangku", $con);
    $sql="SELECT * FROM user WHERE userName='".$uname."'" AND "passWord='".$pwd."'";

    $result = mysql_query($sql);
    // echo  $result;
    if($row = mysql_fetch_array($result)){
      // echo $row['userName'] . " " . $row['passWord'];
      echo 1;
    }else{
        echo 0;
    }

?>



