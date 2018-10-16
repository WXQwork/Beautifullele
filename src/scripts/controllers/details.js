import detailTpl from '../views/details.html'
import detailModel from '../models/details'
import detailGoodTpl from '../views/details-goods.html'
import Backs from '../utils/back';

const render = async ()=>{
    $("#root").html(detailTpl);
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
            console.log(data)
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

export default {
    render
}