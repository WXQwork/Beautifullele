import newGoodsTpl from "../views/new-goods.html"
import newGoodsListTpl from "../views/new-goods-list.html"
import newGoodsModel from "../models/new-goods"
import Backs from '../utils/back';

var datasource = []
var num = 2
var priceInter=0;
var min=0;
var max=0;

const render = async ()=>{
    $('#root').html(newGoodsTpl)
    let list = datasource = (JSON.parse(await newGoodsModel.newGood())).goods_list
    renderNewgoods(list);
    new Backs(".goback").init()
    $(".newList li").on("tap",function(){
        let shopId = $(this).attr("data-url");
        location.href = "?id="+shopId+"#details"
    })
    scroll()

    //切换风格
    $('.cutStyle').on("tap",function(){
        if($('main').attr("class")=='mainStyle1'){
            $(this).html("&#xe658;")
            $('main').attr("class","mainStyle2")
        }else if($('main').attr("class")=='mainStyle2'){
            $(this).html("&#xe62e;")
            $('main').attr("class","mainStyle1")
        }
    })

    //价格升降排序
    $(".priceUp").on("tap",function(){
        $(".priceUp").attr("data-click","true")
        $(".priceUp").css("color","#dd2727")
        $(".priceDown").css("color","#666")
        $(".priceUp").parent().siblings().css("color","#dd2727")
        $(".priceDown").removeAttr("data-click")
        let list = datasource.sort(compareUp("show_price"));
        renderNewgoods(list);
    })
    $(".priceDown").on("tap",function(){
        $(".priceDown").attr("data-click","true")
        $(".priceUp").css("color","#666")
        $(".priceDown").css("color","#dd2727")
        $(".priceUp").removeAttr("data-click")
        let list = datasource.sort(compareDown("show_price"));
        renderNewgoods(list);
    })

    //筛选
    $(".filterP").on("tap",function(){
        $(".mask").css("display","flex")
        $(".dispaly").on("tap",function(){
            $(".mask").css("display","none")
        })
    })
    $(".interval span").on("tap",function(){
       
        $(this).css({
            border:"1px solid #da0000",
            color:"#da0000",
            background:"#fff"
        })
        $(this).attr("data-interval","true")
        $(this).siblings().css({
            border:"1px solid #f5f5f5",
            color:"#666",
            background:"#f5f5f5"
        })
        $(this).siblings().removeAttr("data-interval")

        priceInter = $(this).html();
        min = parseInt(priceInter.split("-")[0]);
        max = parseInt(priceInter.split("-")[1])
    })
    $(".sure").on("tap",function(){
        var list = [];
        if(priceInter && priceInter!=NaN){
            for(var i=0;i<datasource.length;i++){
                if(datasource[i]["show_price"] <= max && datasource[i]["show_price"] >= min){
                    list.push(datasource[i])
                    console.log(list)
                    renderNewgoods(list);
                }
            }
        }
    })
    $(".resize").on("tap",function(){
        for(var i=0;i<3;i++){
            if($(".interval span").eq(i).attr("data-interval")){
                $(".interval span").eq(i).removeAttr("data-interval")
                $(".interval span").eq(i).css({
                    border:"1px solid #f5f5f5",
                    color:"#666",
                    background:"#f5f5f5"
                })
            }
        }
    })
}

//升序
const compareUp = (attr)=>{
    return (a,b)=>{
        var value1 = a[attr]
        var value2 = b[attr]
        return value1-value2
    }
}

//降序
const compareDown = (attr)=>{
    return (a,b)=>{
        var value1 = a[attr]
        var value2 = b[attr]
        return value2-value1
    }
}

const renderNewgoods = async (list)=>{
    let template = Handlebars.compile(newGoodsListTpl);
    let newlist = template({list});
    $(".newList").html(newlist);
}

const scroll = ()=>{
    let newScroll = new BScroll("#root",{
        probeType:2,
        scrollY:true
    })

    newScroll.on("scroll",function(){
        let top = this.y,
            maxY = this.maxScrollY - top
            if(top <= -84){
                $("#root").before($(".ceiling"))
                $(".ceiling").attr("id","fixed-top")
                $(".ceiling").attr("class","ceiling1")
            }else if(top > -84){
                $("main").before($(".ceiling1"))
                $(".ceiling1").removeAttr("id")
                $(".ceiling1").attr("class","ceiling")
            }
        
    })
    newScroll.on("scrollEnd",async function(){
        let top = this.y,
            maxY = this.maxScrollY - top;
            if(maxY >= 0){
                let result1 = (JSON.parse(await newGoodsModel.loadmore(++num))).goods_list;
                let list = datasource = [
                    ...datasource,
                    ...result1
                ]
                await renderNewgoods(list)
                this.refresh()
                if( $(".priceUp").attr("data-click")){
                    let list = datasource.sort(compareUp("show_price"));
                    renderNewgoods(list);
                }else if($(".priceDown").attr("data-click")){
                    let list = datasource.sort(compareDown("show_price"));
                    renderNewgoods(list);
                }else if(!($(".priceUp").attr("data-click")&&$(".priceDown").attr("data-click"))){
                    let list = datasource.sort(function(){return 0.5-Math.random()});
                    renderNewgoods(list);
                }
            }
    })
}

export default {
    render
};