$(function(){

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

     var uname,pwd,enterKey=false;

    $('#btn').on("click",function(){
        uname=$('#userName').val();
        pwd=$("#password").val();
        ajaxTable("php-table/login.php",{
            uname:uname,
            pwd:pwd
        },function(data){
            console.log(uname);
            if(data.length!=0){
                if(data[0].userName==uname && data[0].passWord==pwd){
                    window.location.href="index-table.html?"+uname;
                }
            }else{
                $('#myDelete').modal('toggle');
            }
        });
    });

    $("#sure").click(function(){
        $('#myDelete').modal('toggle');
    });
    $("#userName").on("blur",function(){
        if(/^(Admin)|(super)|(user)$/.test($(this).val())===false){
            $(".info").html("账号不存在！");
        }else{
            $(".info").html("");
        }
    });

    $("#password").focus(function(event) {
        enterKey=true;
        console.log(enterKey);
    });
    $(window).keydown(function(event) {
       if(enterKey){
            if(event.keyCode==13){
                uname=$('#userName').val();
                pwd=$("#password").val();
                ajaxTable("php-table/login.php",{
                    uname:uname,
                    pwd:pwd
                },function(data){
                    if(data.length!=0){
                        if(data[0].userName==uname && data[0].passWord==pwd){
                            window.location.href="index-table.html?"+uname;
                        }
                    }else{
                        $('#myDelete').modal('toggle');
                    }
                    enterKey=false;
                });
            }
       }
    });

})