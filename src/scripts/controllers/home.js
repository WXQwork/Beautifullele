import homeTpl from '../views/home.html'

const render=()=>{
    document.querySelector("#root").innerHTML=homeTpl;
    changeTab();
    scroll();
}

const changeTab =()=>{
    $("nav li").on("tap",function(){
        let hashs = ['#position', '#search', '#profile','#admin']
        location.hash = hashs[$(this).index()]
        $(this).addClass('active').siblings().removeClass('active')
    })
}

const scroll=()=>{
    let posScroll = new BScroll('.mob-header-nav', {
        probeType: 2,
        scrollX:true
    })
}

export default {
    render
}