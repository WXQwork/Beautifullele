import homeTpl from '../views/home.html'

const render=()=>{
    document.querySelector("#root").innerHTML=homeTpl;
    changeTab();
    changeTopTab();
    scroll();
}

const changeTab =()=>{
    $(".navfooter li").on("tap",function(){
        let hashs = ['#position', '#search', '#profile','#admin']
        location.hash = hashs[$(this).index()]
        $(this).addClass('active').siblings().removeClass('active')
    })
}

const changeTopTab = ()=>{
    $(".mob-header-nav ul li").on("tap",function(){
        let hashs = ["#top1","#top2","#top3","#top4","#top5","#top6","#top7","#top8"]
        location.hash = hashs[$(this).index()]
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