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
            console.log(this,this.maxScrollY)
            if(maxY >= 0){
                let result1 = (JSON.parse(await newGoodsModel.loadmore(++num))).goods_list;
                let list = datasource = [
                    ...datasource,
                    ...result1
                ]
                console.log(list)
                await renderNewgoods(list)
                this.refresh()
                this.scroll.scrollTo(0,this.maxScrollY)
            }
    })
}


export default {
    render
};