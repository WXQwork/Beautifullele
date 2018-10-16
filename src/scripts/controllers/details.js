import detailTpl from '../views/details.html'

const render = ()=>{
    $("#root").html(detailTpl);
    scroll();
    var idurl = location.href.split("?")[1].split("#")[0]
    console.log(idurl)
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