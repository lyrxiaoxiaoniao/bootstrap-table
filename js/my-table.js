$(function() {

    var LoginName=window.location.search.substr(1);
    $("#admin").html(LoginName);//把用户名带过来
    var superName=$("#admin").html();
    $('#logout').on('click',function(){
        window.location.href="index.html";
    });
    //如果是超级管理员则开放用户管理功能
    if(superName){
        if( superName=="Admin"){
            $('#userControl').show();
            $("#historyDelete").show();
        }else if(superName=="super"){
            $('#userControl').hide();
            $("#historyDelete").hide();
        }else{
            $("#all_product").show();
            $("#search_box").show();
            $("#control").hide();
            $("#history").hide();
            $('#userControl').hide();
            $("#historyDelete").hide();
        }
    }


    $(window).on("resize",function(){
        if($(this).width()>=375 && $(this).width()<770){
            $('#munes').off("click");
            $(".content .left>ul>li").off("click");
            mobile();
        }else{
             // location.reload();
        }
    });

    function respondSize(){
           var munesflag=true;
            $('#munes').on('click',function(){
                if(munesflag){

                    $('.content .left span').css({display:'none'});
                    $('.content .left').animate({
                        width:45,
                    },150,function(){
                          $('#munes i').addClass(" fa-chevron-right");

                    });

                }else{

                    $('.content .left').animate({
                        width:150
                    },150,function(){
                        $('#munes i').removeClass(" fa-chevron-right");
                        $('.content .left span').css({display:'inline-block'});
                    });
                }
                munesflag=!munesflag;
            })
    }
    function mobile(){
        $('#munes').on('click', function() {
                $('.content .left').animate({
                    width: 150
                }, 150, function() {
                    $('#munes i').removeClass(" fa-chevron-right");
                    $('.content .left span').css({
                        display: 'inline-block'
                    });
                });
            })

            $(".content .left>ul>li").on("click",function(){
                $('.content .left span').css({
                    display: 'none'
                });
                $('.content .left').animate({
                    width: 45,
                }, 150, function() {
                    $('#munes i').addClass(" fa-chevron-right");

                });

            });
    }

    //ajax 请求函数
    function ajaxTable(url, obj, callback) {
        $.ajax({
            type: 'post',
            url: url,
            dataType: "json",
            data: obj,
            success: function(data) {
                callback(data);
            }
        });
    }
    /*table 表格栏 初始化配置 start*/
    $.extend($.fn.bootstrapTable.defaults, {
        striped: true, // 设置为 true 会有隔行变色效果
        sortStable: true, //设置为 true 将获得稳定的排序，我们会添加_position属性到 row 数据中。
        pagination: true, //设置为 true 会在表格底部显示分页条
        onlyInfoPagination: false, //设置为 true 只显示总数据数，而不显示分页按钮。需要 pagination='True'
        pageNumber: 1, // 如果设置了分页，首页页码
        pageSize: 10, //如果设置了分页，页面数据条数
        pageList: [6, 8, 10], //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
        showHeader: true,
        showColumns: true,
        search: true,
        showRefresh: true,
        showToggle: true,
        showPaginationSwitch: true,
        paginationPreText: '<',
        paginationNextText: '>',
        toolbar: '#Toolbar',
        showExport: true,//显示导出按钮
        exportDataType: "all",//导出类型
    });
    $.extend($.fn.bootstrapTable.columnDefaults, {
        align: 'center'
    });

    datafresh('php-table/search.php');//页面开始刷新页面
    //全部商品加载列表 table
    function datafresh(url) {
        $('#table').bootstrapTable({
            url: url,
            columns: [{
                sortable: true,
                title: 'ID'
            }, {
                field: "1",
                title: '商品分类'
            }, {
                field: "2",
                title: '商品名称'
            }, {
                field: "3",
                title: '商品数量'
            }, {
                field: "4",
                title: '操作时间'
            }, {
                field: "5",
                title: '操作/领取人员'
            }]
        });
    }
    //带有修改与删除功能的全部商品加载列表 table_delet
    function deleteFresh(url) {
        $('#table_delet').bootstrapTable({
            url: url,
            columns: [{
                sortable: true,
                title: 'ID'
            }, {
                field: "1",
                title: '商品分类'
            }, {
                field: "2",
                title: '商品名称'
            }, {
                field: "3",
                title: '商品数量'
            }, {
                field: "4",
                title: '操作时间'
            } , {
                field: "5",
                title: '操作/领取人员'
            },{
                title:"修改/删除",
                 formatter: function (value, row) {
                                var btns = '<button type="button" class="btn btn-success btn-xs" data-toggle="modal" data-target="#exampleModal" data-whatever="修改">修改</button> ';
                                btns += '<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#myDelete" data-whatever="删除">删除</button>';
                                return btns;
                            }
            }, {
                checkbox: true,
                title: 'checkbox'
            }]
        });
        // console.log(33);
    }

    //历史商品加载列表 table1
    function historyFresh(url) {
        $('#table1').bootstrapTable({
            url: url,
            columns: [{
                sortable: true,
                title: 'ID'
            }, {
                field: "1",
                title: '商品分类'
            }, {
                field: "2",
                title: '商品名称'
            }, {
                field: "3",
                title: '商品数量'
            }, {
                field: "4",
                title: '操作时间'
            } ,{
                field: "5",
                title: '操作方式'
            }, {
                field: "6",
                title: '操作/领取人员'
            }]
        });
        // console.log(33);
    }


    /*table 表格栏end*/
    // 添加商品
    //
    //拿到当前点击修改的一行数据并赋值到模态框上
    var json;
    $('#table_delet').on('click-row.bs.table', function ( row, $element) {
        json=$element;//获取当前点击行数据然后保存起来
    });
     //
     var recipient;
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        recipient = button.data('whatever'); // Extract info from data-* attributes
        var modal = $(this);
        modal.find('.modal-title').text(recipient);
        if(recipient=="修改"){
            modal.find('#class').val(json[1]);
            modal.find('#name').val(json[2]);
            modal.find('#num').val(json[3]);
            // modal.find('#people').val(json[5]);
        }else{
            modal.find('#class').val("");
            modal.find('#name').val("");
            modal.find('#num').val("");
            modal.find('#people').val("");
        }
    })

    var peopleVal=$('#admin').text();//操作人员。

    //添加与修改模块
     //添加？修改模态框点击发送数据的点击事件
    $("#send").on('click', function() {
        var classVal = $('#class').val();
        var nameVal = $('#name').val();
        var numVal = $('#num').val();
        if($('#people').val()!==""){ //如果不为当前登录人员
            peopleVal = $('#admin').text()+"/"+$('#people').val();
        }
        var currentTime = new Date().toLocaleString();
        var rec = recipient;
        //添加商品 根据数据库返回的数据,刷新页面信息
        if(rec=="商品入库"){
            if(classVal=="" || nameVal=="" || numVal==""){
                return;
            }
            ajaxTable("php-table/product.php", {
                class_val: classVal,
                name_val: nameVal,
                num_val: numVal,
                rec: rec,
                id_val:"",
                people_val: peopleVal,
                current_time: currentTime
            }, function(data) {
                $('#table').bootstrapTable('load', data);//加载新数据
                $('#exampleModal').modal('toggle');
                $(".one").show();
                $(".two").hide();//历史商品隐藏
                $('.three').hide();//待修改和删除全部商品显示
            });
        }else if(rec=="修改"){
            var id = json[0];
            ajaxTable("php-table/product.php",{
                class_val: classVal,
                name_val: nameVal,
                num_val: numVal,
                rec: rec,
                id_val:id,
                people_val: peopleVal,
                current_time: currentTime
            },function(data){
                $('#table_delet').bootstrapTable('load', data);//加载新数据 table_delet
                $('#exampleModal').modal('toggle');
            });
        }
    });


    //删除功能模块
    $("#sure").on('click',function(){
        var classVal = json[1];
        var nameVal = json[2];
        var numVal = json[3];
        peopleVal = $('#admin').text();
        var currentTime = new Date().toLocaleString();
        var rec = "删除";
        var id = json[0];
        ajaxTable("php-table/delete.php",{
                class_val: classVal,
                name_val: nameVal,
                num_val: numVal,
                rec: rec,
                id_val:id,
                people_val: peopleVal,
                current_time: currentTime
            },function(data){
                $('#table_delet').bootstrapTable('load', data);//加载新数据 table_delet
                $('#myDelete').modal('toggle');
            });
    });



     //输入提示
    //添加修改弹出框的input输入提示start
    $('#name').on('keyup',function(){
        $(this).popover('show');
        if(/^[\u4e00-\u9fa5]{0,}$/.test($(this).val())===false){//检测是否是汉字
            $(this).popover('show');
        }else{
            $(this).popover('hide');
        }
    });
    $('#people').on('keyup',function(){
        $(this).popover('show');
        if(/^[\u4e00-\u9fa5]{0,}$/.test($(this).val())===false){//检测是否是汉字
            $(this).popover('show');
        }else{
            $(this).popover('hide');
        }
    });
    $('#num').on('keyup',function(){
        $(this).popover('show');
        if(/\d+/.test($(this).val())===false){//检测是否是数字
            $(this).popover('show');
        }else{
            $(this).popover('hide');
        }
    });

        //点击修改删除按钮刷新带有修改删除的商品表
    $('#delete_box').on("click",function(){
        $('.three').show().siblings().hide();//待修改和删除全部商品显示  其他隐藏
        // $(".two").hide();//历史商品隐藏
        // $(".one").hide();//历史商品隐藏
        deleteFresh('php-table/search.php');
    });

    //点击全部商品获取商品表数据
    $("#all_product").on("click",function(){
        $('.one').show().siblings().hide();//全部商品显示
        // $(".two").hide();//历史商品隐藏
        // $('.three').hide();//待修改和删除全部商品显示
        datafresh("php-table/search.php");
    });

    // 点击历史记录刷新历史记录的操作
    //
    $("#history").on("click",function(){
        // $('.one').hide();//全部商品隐藏
        $(".two").show().siblings().hide();//历史商品显示
        // $('.three').hide();//待修改和删除全部商品显示
        historyFresh("php-table/history-search.php");
    });



    // 搜索功能实现
    // 一开始隐藏
    $(".search").hide();
    var flag = true;
    $("#search_box").on("click", function() {
        if (flag) {
            $(".search").show();
        } else {
            $(".search").hide();
        }
        flag = !flag;
    });

    //点击商品操作显示可操作项目
    $(".columns-right").hide();
    var flag1 = true;
    $("#control").on("click", function() {
        if (flag1) {
            $(".columns-right").show();
        } else {
            $(".columns-right").hide();
        }
        flag1 = !flag1;
    });



    //全部用户加载列表 table
    function userfresh(url) {
        $('#table-user').bootstrapTable({
            url: url,
            columns: [{
                field: "id",
                title: 'ID',
                sortable: true
            }, {
                field: "userName",
                title: '用户名'
            }, {
                field: "passWord",
                title: '密码'
            }, {
                field: "xiaoTrue",
                title: '权限等级'
            }]
        });
    }

    //历史记录删除
    var adminControl;//记录当前到底是点击了用户管理，还是历史删除
    $("#userControl").click(function(){
        adminControl="用户管理";
        $("#delete").text("请输入密码查看用户！");
    });
    $("#historyDelete").click(function(){
        console.log($("#delete_title"));
        adminControl="历史删除";
        $("#delete").text("请输入密码确认删除！");
    });
    //点击用户管理查看登陆信息或者点击历史删除，删除历史数据
    var istrue=false;
    $("#pwdsure").on('click',function(){
        if(istrue){
            if(adminControl=="用户管理"){
                $(".four").show().siblings().hide();//用户管理显示
                userfresh("php-table/login-search.php");
            }else if(adminControl=="历史删除"){
                ajaxTable("php-table/historyDelete.php",{},function(data){
                    if(data==1){
                        $(".two").show().siblings().hide();//历史商品显示
                        historyFresh("php-table/history-search.php");
                    }
                });
            }
            $('#pwdAdmin').modal('toggle');
            $("#inputPassword").val("");
            istrue=!istrue;
        }
    });

    $("#inputPassword").on('blur',function(){
        if(/^(admin)$/.test($("#inputPassword").val())===true){
            istrue=true;
            $('.info').html("");
        }else if($("#inputPassword").val().length>=5){
            $('.info').html("密码错误");
        }
    });

    //商品短缺提升功能模块
    var objInfo={};
    $("#infoNum").on("click",function(){
        ajaxTable("php-table/info.php",{},function(data){
            objInfo.result=data;
            var str =template("infoLists",objInfo);
            $("#infoNum").siblings('ul').html(str);
        })
    });


})