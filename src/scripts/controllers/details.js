import detailTpl from '../views/details.html'
import detailModel from '../models/details'
import detailGoodTpl from '../views/details-goods.html'
import Backs from '../utils/back';

const render = async ()=>{
    $("#root").html(detailTpl);
    $("#letgo").on("tap",()=>{
        console.log(111)
        location.hash="#profile"
      })
    new Backs(".goback1").init()
    scroll();
    var goodId = location.href.split("?")[1].split("#")[0].split("=")[1]
    console.log(goodId)
    let dataList = JSON.parse(await detailModel.details()).goods_list;
    for(var i in dataList){
        if(goodId == dataList[i].id){
            var data = dataList[i]
            let template = Handlebars.compile(detailGoodTpl)
            let lookList =template(data)
            gocar(data)
            $(".goodDetail").html(lookList)
        }
    }
}

const scroll = ()=>{
    let delScroll = new BScroll("#root",{
        probeType:2,
        scrollY:true
    })
}

const gocar = (data)=>{
    console.log(data)
    var imgs="//image.meilele.com/"+data.goods_img
    var title=data.goods_name
    var price=data.shop_price
    var num=1
    var iid=data.id
    $("#gocar").on("tap",function(){
        if(sessionStorage.getItem("ID")){
            var id=sessionStorage.getItem("ID");
            $.ajax({
                type:"get",
                url:"/gobuy",
                data:{
                    user:id,
                    iid:iid,
                    img:imgs,
                    price:price,
                    tit:title,
                    num:num
                },
                success:function(data){
                    if(data.status==1){
                        layer.open({
                            content: '加入购物车成功，是否立即查看？'
                            ,btn: ['立即前往', '继续逛逛']
                            ,yes: function(index){
                               location.href="#profile"
                               layer.close(index);
                            }
                          });
                    }else{
                        layer.open({
                            content: '加入购物车失败失败'
                            ,skin: 'msg'
                            ,time: 2
                          });
                    }
                }
            })
        }else{
            layer.open({
                content: '为了您更好的体验，请您登录后再购买!'
                ,btn: '我知道了'
              })
        }
    })
}

export default {
    render
}