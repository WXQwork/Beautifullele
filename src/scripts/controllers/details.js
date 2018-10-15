import detailTpl from '../views/details.html'

const render = ()=>{
    $("#root").html(detailTpl);
    scroll();
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