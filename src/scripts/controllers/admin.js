import adminTpl from "../views/admin.html"
import Backs from '../utils/back';

const render = ()=>{
    $("#root").html(adminTpl)
    new Backs(".ad-header i").init()
    adclick()
    adblur()
}

const adclick = ()=>{
    $(".ad-attr span").on("tap",()=>{
        location.hash="#register";
    })
    $("#userlogin").on("tap",()=>{
        let neme = $("#username")
        let pas= $("#password")
        if(neme.val()==""){
            layer.open({
                content: "手机号不能为空!",
                skin: 'msg',
                time: 2 
            });
        }
        if(pas.val()==""){
            layer.open({
                content: "密码不能为空!",
                skin: 'msg',
                time: 2 
            });
        }
        if(neme.val()!=""&&pas.val()!=""){
            $.ajax({
                type:"get",
                url:"/logn",
                data:{
                    use:neme.val(),
                    pas:pas.val()
                },
                success:function(data){
                    if(data.status==1){
                        sessionStorage.setItem("ID",data.id)
                        layer.open({
                            content: "登录成功!",
                            skin: 'msg',
                            time:2
                        });
                        location.hash="#position"
                    }else{
                        layer.open({
                            content: "用户名密码错误!",
                            skin: 'msg',
                            time: 2 
                        });
                    }
                }
            })
        }
    })
}

const adblur = ()=>{
    $("#password").on("input",function(){
        if($(this).val()!=""){
            $("#userlogin").css("background-color","#da0000")
        }else{
            $("#userlogin").css("background-color","#ccc")
        }
    })
}

export default {
    render
}