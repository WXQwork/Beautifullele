import newGoodsTpl from "../views/new-goods.html";
const render = ()=>{
    /* let template = Handlebars.compile(newGoodsTpl); */
    $('#root').html(newGoodsTpl);
    scroll();
}

const scroll = ()=>{
    let newScroll = new BScroll("#root",{
        probeType:2,
        scrollY:true
    })

    newScroll.on("scroll",function(){
        let top = this.y;
        console.log(top)

        if(top <= -84){
            $(".ceiling").addClass("fixed-top");
        }
    })
}


export default {
    render
};