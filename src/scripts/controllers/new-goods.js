import newGoodsTpl from "../views/new-goods.html"
import newGoodsListTpl from "../views/new-goods-list.html"
import newGoodsModel from "../models/new-goods"
import Backs from '../utils/back';

var datasource = []
var num = 2

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
        $(".priceDown").attr("data-click","false")
        let list = datasource.sort(compareUp("show_price"));
        renderNewgoods(list);
    })
    $(".priceDown").on("tap",function(){
        $(".priceUp").attr("data-click","false")
        $(".priceDown").attr("data-click","true")
        let list = datasource.sort(compareDown("show_price"));
        renderNewgoods(list);
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
            maxY = this.maxScrollY - top;
        
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
            }
            if( $(".priceUp").attr("data-click")=="true"){
                let list = datasource.sort(compareUp("show_price"));
                console.log(list);
                renderNewgoods(list);
            }
    })
}

export default {
    render
};