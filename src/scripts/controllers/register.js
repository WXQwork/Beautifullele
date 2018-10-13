import registerTpl from  "../views/register.html"
import Backs from '../utils/back';

const render = ()=>{
    $("#root").html(registerTpl)
    new Backs(".re-height i").init()
    reclick()
}

const reclick = ()=>{
    $(".re-btn a").on("tap",()=>{
        location.hash="#admin";
    })
}

export default {
    render
}