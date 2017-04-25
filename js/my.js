$(function(){
    var munesflag=true;
    $('#munes').on('click',function(){
        if(munesflag){

            $('.content .left span').css({display:'none'});
            $('.content .left').animate({
                width:60,
            },150,function(){
                  $('#munes i').addClass(" fa-chevron-right");

            });

        }else{

            $('.content .left').animate({
                width:200
            },150,function(){
                $('#munes i').removeClass(" fa-chevron-right");
                $('.content .left span').css({display:'inline-block'});
            });
        }
        munesflag=!munesflag;
    })

    //添加修改弹出框的input输入提示start
    $('#name').on('keyup',function(){
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
    //添加修改弹出框的input输入提示end
    //初始化页面刷新页面数据
    sb("php/product.php",{class_val:'',name_val:'',num_val:'',rec:'',current_time:''},function(data){
        dataFresh(data);
        $('#all_product .allData').html( data.length);//给全部商品显示所有数据条数
    });

    //历史操作记录刷新页面的tr模板
    function historyFresh(data){
        var str='';
        var strH='<tr>'
                +'    <th>序号</th>'
                +'    <th>商品分类</th>'
                +'    <th>商品名称</th>'
                +'    <th>商品数量</th>'
                +'    <th>操作时间</th>'
                +'    <th>操作方式</th>'
                +'</tr>';

        $('#ck_data').children().remove();
        $('#ck_data').append(strH);
        for(var i=0;i<data.length;i++){

            str='<tr data-id="'+data[i][0]+'">'
            +'    <td>'+(i+1)+'</td>'
            +'    <td>'+data[i][1]+'</td>'
            +'    <td>'+data[i][2]+'</td>'
            +'    <td>'+data[i][3]+'</td>'
            +'    <td>'+data[i][4]+'</td>'
            +'    <td>'+data[i][5]+'</td>'
            +'</tr>';

            $("#ck_data").append(str);
        }
    }
    //不带修改删除部分的tr标签模板
    function dataFresh(data){
        var str='';
        var strH='<tr>'
                +'    <th>序号</th>'
                +'    <th>商品分类</th>'
                +'    <th>商品名称</th>'
                +'    <th>商品数量</th>'
                +'    <th>操作时间</th>'
                +'</tr>';

        $('#ck_data').children().remove();
        $('#ck_data').append(strH);
        for(var i=0;i<data.length;i++){

            str='<tr data-id="'+data[i][0]+'">'
            +'    <td>'+(i+1)+'</td>'
            +'    <td>'+data[i][1]+'</td>'
            +'    <td>'+data[i][2]+'</td>'
            +'    <td>'+data[i][3]+'</td>'
            +'    <td>'+data[i][4]+'</td>'
            +'</tr>';

            $("#ck_data").append(str);
        }
    }
    //刷新函数  tr标签的内容模板
    function fresh(data){
        var str='';
        var strH='<tr>'
                +'    <th>序号</th>'
                +'    <th>商品分类</th>'
                +'    <th>商品名称</th>'
                +'    <th>商品数量</th>'
                +'    <th>操作时间</th>'
                +'    <th>商品操作</th>'
                +'</tr>';

        $('#ck_data').children().remove();
        $('#ck_data').append(strH);
        for(var i=0;i<data.length;i++){

            str='<tr data-id="'+data[i][0]+'">'
            +'    <td>'+(i+1)+'</td>'
            +'    <td>'+data[i][1]+'</td>'
            +'    <td>'+data[i][2]+'</td>'
            +'    <td>'+data[i][3]+'</td>'
            +'    <td>'+data[i][4]+'</td>'
            +'    <td class="change">'
            +'    <a href="#" data-toggle="modal" data-target="#exampleModal" data-whatever="修改商品" class="change_child">修改</a><span>|</span><a href="#" class="p_delete" data-toggle="modal" data-target=".bs-example-modal-sm">删除</a>'
            +'    </td>'
            +'</tr>';

            $("#ck_data").append(str);
        }

    }
    //浏览器刷新ajax请求
    //url:为请求页面地址
    //obj:往后台发送的数据
    //callback:回调函数
    function sb(url,obj,callback){
        $.ajax({
                type:"post",
                url:url,
                dataType:"json",
                data:obj,
                success:function(data){
                    callback(data);
                }

            });
        }
    //点击下载按钮
    // $('#download').on('click',function(){
    //     sb('php/download.php',{class_val:'',name_val:'',num_val:'',rec:'',current_time:'',rec:''});
    // });
    //点击历史操作 刷新历史记录页面
    $('#history').on('click',function(){
        sb('php/history.php',{class_val:'',name_val:'',num_val:'',rec:'',current_time:''},function(data){
            if(data[0]!=undefined){
                historyFresh(data);
                recipient='历史记录';
                $('.historyData').html(data.length);
            }
        });
    });
    //点击全部商品，刷新页面
    $("#all_product").on('click',function(){
        sb("php/product.php",{class_val:'',name_val:'',num_val:'',rec:'',current_time:''},function(data){
            dataFresh(data);
            $('#all_product .allData').html( data.length);//给全部商品显示所有数据条数
        });
        recipient='';
    });
    //点击修改/删除商品，刷新带有修改和删除的按钮
    $('#delete_box').on('click',function(){
        sb("php/product.php",{class_val:'',name_val:'',num_val:'',rec:'',current_time:''},fresh);
    });

    //商品添加修改
    //bootstrap自带方法 start
    var recipient='';
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        recipient = button.data('whatever') // Extract info from data-* attributes

        var modal = $(this);

        modal.find('.modal-title').text(recipient)
    });
    $('#exampleModal').on('hidden.bs.modal', function (e) {
      var modal = $(this);
      modal.find('.form-control').val("");
    });
    //bootstrap自带方法 end

    //修改
    var td_change='';
    var td_self='';
    //点击修改按钮 把当前的tr数据发到弹出框里
    $("#ck_data").on('click','.change_child',function(){
        td_self=$(this).parent().parent();//得到当前修改按钮的tr标签
        td_change=td_self.children();//得到当前修改的所有td标签
        $("#class").val(td_change.eq(1).html());
        $("#name").val(td_change.eq(2).html());
        $("#num").val(td_change.eq(3).html());
    });
    $("#send").on('click',function(){
        var classVal=$('#class').val();
        var nameVal=$('#name').val();
        var numVal=$('#num').val();
        var currentTime=new Date().toLocaleString();
        if(recipient=='修改商品'){
            //给历史记录数据库里添加数据
            sb("php/history.php",{class_val:classVal,name_val:nameVal,num_val:numVal,rec:recipient,current_time:currentTime});
            //给product商品数据库修改商品
            var idVal=td_self[0].dataset.id;
            sb('php/product.php',{class_val:classVal,name_val:nameVal,num_val:numVal,rec:recipient,id:idVal,current_time:currentTime},fresh);
            $('#exampleModal').modal('toggle');
         }else if(recipient=='添加商品'){
            //给历史记录数据库里添加数据
            sb("php/history.php",{class_val:classVal,name_val:nameVal,num_val:numVal,rec:recipient,current_time:currentTime});
            //添加商品 根据数据库返回的数据,刷新页面信息
            sb("php/product.php",{class_val:classVal,name_val:nameVal,num_val:numVal,rec:recipient,current_time:currentTime},function(data){
                dataFresh(data);
                $('#all_product .allData').html( data.length);
            });
            $('#exampleModal').modal('toggle');
         }
    });
    //修改end
     //删除商品start
    //
    var sure=false;//记录删除弹出框点击确认的标记sure
    var mythis,id;
    $('#ck_data').on('click','.p_delete',function(){

        mythis=$(this);      //得到当前删除按钮
        id =$(this).parent().parent()[0].dataset.id;    //得到当前tr数据的id值

        //吧删除记录，上传到history数据库
        td_self=$(this).parent().parent();//得到当前修改按钮的tr标签
        td_change=td_self.children();//得到当前修改的所有td标签

    });
    //点击弹出框的确认按钮  发送ajax请求，数据库删除成功则删除数据
    $('#sure').on('click',function(){
        $('#myDelete').modal('hide');//弹出框隐藏
        sure=true;
        if(sure==true){
            var classVal = td_change.eq(1).html();
            var nameVal = td_change.eq(2).html();
            var numVal  = td_change.eq(3).html();
            var currentTime=new Date().toLocaleString();
            recipient='删除商品';
            sb("php/history.php",{class_val:classVal,name_val:nameVal,num_val:numVal,rec:recipient,current_time:currentTime});

            $('#all_product .allData').html( $('#all_product .allData').html()-1);
            //把弹出框点击确认的标记sure 改为FALSE;
            sure=false;
            //调用sb函数,(ajax请求函数)
            //把id值数据传送到服务器并在数据库里根据id删除
            sb("php/delete.php",{id:id},function(data){
                // console.log(data);
             //如果数据库删除成功返回  1
                 if(data==1){
                    // 调用sb函数刷新页面数据
                    sb("php/product.php",{class_val:'',name_val:'',num_val:'',rec:'',current_time:''},fresh);
                    //删除当前数据行
                    mythis.parent().parent().remove();
                 }
            });
        }

    });
    //删除end

     //仓库搜索框start
    $('#search_sure').on("click",function(){
        var searchClass = $('#search_class').val();
        var searchName = $('#search_name').val();
        if(recipient=='历史记录'){
            sb('php/history.php',{ class_val:searchClass , name_val:searchName ,num_val:'' ,rec:recipient, current_time:''},function(data){
                if(data[0]!=undefined){
                    historyFresh(data);
                }else{
                    $('#ck_data').children().remove();
                    $("#ck_data").append('<h1>没有相应的数据...</h1>');
                }
                $('.searchData').html(data.length);
                $('.historyData').html(data.length);
            });
        }else{//如果不是历史记录表的话，就查询商品库
            sb('php/search.php',{ class_val:searchClass , name_val:searchName },function(data){
                if(data[0]!=undefined){
                    dataFresh(data);
                    $('.searchData').html(data.length);
                }else {
                    $('#ck_data').children().remove();
                    $("#ck_data").append('<h1>没有相应的数据...</h1>');
                    $('.searchData').html(0);
               }
            });
         }
    });
    $('#search_box').on('click',function(){
        $('.ck_search').toggleClass('tabClass');
    });
    //仓库搜索框end

    //用户退出start
    $('#logout').on('click',function(){
        window.location.href="index.html";//返回登录页面
    });
    //用户退出end

})