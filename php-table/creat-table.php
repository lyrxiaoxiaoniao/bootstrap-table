<?php

    $mysqli = mysqli_init();
    if (!$mysqli) {
        die('mysqli_init failed');
    }

    if (!$mysqli->real_connect('localhost', 'root', 'websoft9', 'cangku2')) {
        die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
    }

    if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    } else {
        printf("Current character set: %s\n", $mysqli->character_set_name());
    }
    //创建用户表格
    $sql = "CREATE TABLE user
        (
            id int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            userName varchar(15),
            passWord varchar(15),
            xiaoTrue varchar(15)
        )";
    $result = $mysqli->query($sql);

    //创建库存商品表格
    $sql = "CREATE TABLE product
        (
            id int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            class varchar(15),
            name varchar(15),
            num int(3),
            currentTime varchar(30),
            people varchar(15)
        )";

    $result = $mysqli->query($sql);

    //创建历史操作记录表格
    $sql = "CREATE TABLE history
        (
            id int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            class varchar(15),
            name varchar(15),
            num int(3),
            currentTime varchar(30),
            operate varchar(15),
            people varchar(15)
        )";

    $result = $mysqli->query($sql);

    /******************* 拓展MySQL表单你 *********************/
    //创建历史搜索记录表格
    $sql = "CREATE TABLE historySearch
        (
            id int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            class varchar(15),
            name varchar(15),
            num int(3),
            currentTime varchar(20),
            operate varchar(15),
            people varchar(15)
        )";

    $result = $mysqli->query($sql);
    //创建历史价格录表格
    $sql = "CREATE TABLE price
        (
            id int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            class varchar(15),
            name varchar(15),
            num int(3),
            currentTime varchar(20),
            operate varchar(15),
            people varchar(15)
        )";

    $result = $mysqli->query($sql);
    //创建藏品录表格
    $sql = "CREATE TABLE allProduct
        (
            id int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY(id),
            class varchar(15),
            name varchar(15),
            num int(3),
            currentTime varchar(20),
            operate varchar(15),
            people varchar(15)
        )";

    $result = $mysqli->query($sql);

    $mysqli->close();

 ?>
