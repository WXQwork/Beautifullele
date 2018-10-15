function Visiter(opactin){
    this.el=$(opactin.el)
    this.tishi=opactin.tishi;
    this.reg=opactin.reg;
    this.regt=opactin.regt;
    this.same=opactin.same;
    this.samet=opactin.samet;
    this.phonesame=opactin.phonesame;
}

$.extend(Visiter.prototype,{
    init:function(){
        this.el.blur($.proxy(this.blu,this))
    },
    blu:function(){
        this.val();
        this.regs();
        this.sam();
    },
    val:function(){
        if(this.el.val()==""){
            layer.open({
                content: this.tishi,
                skin: 'msg',
                time: 2 
            });
            this.el.next().css({
                "display":"block",
                "color":"red"
            }).html("&#xe68c;").attr("go","N")
        }else{
            this.el.next().css({
                "display":"block",
                "color":"green"
            }).html("&#xe621;").attr("go","Y")
        }
    },
    regs:function(){
        if(this.reg!=undefined){
            if(!this.reg.test(this.el.val())){
                layer.open({
                    content: this.regt,
                    skin: 'msg',
                    time: 2 
                });
                this.el.next().css({
                    "display":"block",
                    "color":"red"
                }).html("&#xe68c;").attr("go","N")
            }else{
                this.el.next().css({
                    "display":"block",
                    "color":"green"
                }).html("&#xe621;").attr("go","Y")
                this.psame();
            }
        }
    },
    sam:function(){
        if(this.same!=undefined){
            if($(this.same).val()==this.el.val()){
                this.el.next().css({
                    "display":"block",
                    "color":"green"
                }).html("&#xe621;").attr("go","Y")
            }else{
                layer.open({
                    content: this.samet,
                    skin: 'msg',
                    time: 2 
                });
                this.el.next().css({
                    "display":"block",
                    "color":"red"
                }).html("&#xe68c;").attr("go","N")
            }
            var inp=$("input[class='ti']");
            var bStop=true;
            inp.each(function(){
                if($(this).next().attr("go")=="N"){
                    bStop=false;
                }
            })
            if(bStop){
                $("#register").css("background-color","#da0000")
            }
        }
    },
    gogo:function(){
        this.el.click($.proxy(this.go,this));
    },
    go:function(){
        var inp=$("input[class='ti']");
        var bStop=true;
        inp.each(function(){
            if($(this).next().attr("go")=="N"){
                bStop=false;
            }
        })
        if(bStop){
            $.ajax({
                type:"get",
                url:"/regis",
                data:{
                    phone:inp.eq(0).val(),
                    password:inp.eq(1).val()
                },
                success:function(data){
                    if(data.status==1){
                        layer.open({
                            content: '注册成功，请你立即登录体验吧!',
                            btn: '立即登录',
                            yes: function(index){
                                layer.close(index)
                                location.hash="#admin"
                            }
                        });
                    }
                }
            })
        }else{
            layer.open({
                content: '请填写正确的信息',
                btn: '我知道了'
            });
        }
    },
    psame:function(){
        var _this=this;
        if(this.phonesame!=undefined){
            $.ajax({
                type:"get",
                url:"/phone",
                data:{
                    phone:_this.el.val()
                },
                success:function(data){
                    if(data.status==0){
                        layer.open({
                            content: _this.phonesame,
                            skin: 'msg',
                            time: 2 
                        });
                        _this.el.next().css({
                            "display":"block",
                            "color":"red"
                        }).html("&#xe68c;").attr("go","N")
                    }else{
                        _this.el.next().css({
                            "display":"block",
                            "color":"green"
                        }).html("&#xe621;").attr("go","Y")
                    }
                }
            })
        }
    }
})

export default Visiter