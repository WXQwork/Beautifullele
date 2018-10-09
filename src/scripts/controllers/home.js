import homeTpl from '../views/home.html'

const render=()=>{
    document.querySelector("#root").innerHTML=homeTpl;
    changeTab();
}

const changeTab =()=>{
    $("nav li").on("tap",function(){
        let hashs = ['#position', '#search', '#profile']
        location.hash = hashs[$(this).index()]
        $(this).addClass('active').siblings().removeClass('active')
    })
}

export default {
    render
}