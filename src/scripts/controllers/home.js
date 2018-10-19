import homeTpl from '../views/home.html'

const render = () => {
    document.querySelector("#root").innerHTML = homeTpl;
    changeTab();
    changeTopTab();
    scroll();
    top();
}

const changeTab = () => {
    $(".navfooter li").on("tap", function () {
        let hashs = ['#position', '#search', '#profile', '#admin']
        location.hash = hashs[$(this).index()]
        $(this).addClass('active').siblings().removeClass('active')
    })
}

const changeTopTab = () => {
    $(".mob-header-nav ul li").on("tap", function () {
        let hashs = ["#top1", "#top2", "#top3", "#top4", "#top5", "#top6", "#top7", "#top8"]
        location.hash = hashs[$(this).index()]
    })
}

const scroll = () => {
    let posScroll = new BScroll('.mob-header-nav', {
        probeType: 2,
        scrollX: true
    })
}

const top = () => {
    // $(function () {
    //     // $(".top").hide();
    //     $(window).scroll(function () {
    //         console.log(1)
    //         var top = $(this).scrollTop();
    //         if(top>=$(this).height()){
    //             $(".top").fadeIn();
    //         }else{
    //             $(".top").fadeOut();
    //         }
    //         $(".top").click(function () {
    //             window.scrollTo(0,0);    //  设置内容滚动到指定的坐标
    //         })
    //     })
    // })

    
 
        $('.top').click(function(){
            //获取当前scrollTop的位置
            var curScroll = $(window).scrollTop();
           console.log(curScroll)
            //上升的位移
            var speed = 5;
 
            if(curScroll>0){
                setInterval(timer,1);
            }
 
            // console.log(curScroll);
 
            function timer(){
 
                if(curScroll>0){
 
                    curScroll = curScroll-speed;
                    $(document.body).scrollTop(curScroll);
                    // console.log(curScroll);
 
                    if(curScroll<=0){
 
                        $(document.body).scrollTop(0);
                        clearInterval(timer);
                        console.log("清除计时器")
 
                    }
                }
 
            }
 
        })
      
   
}
export default {
    render
}