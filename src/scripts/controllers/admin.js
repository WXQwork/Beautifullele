import adminTpl from "../views/admin.html"
import Backs from '../utils/back';

const render = ()=>{
    $("#root").html(adminTpl)
    new Backs(".ad-header i").init()
    adclick()
}

const adclick = ()=>{
    $(".ad-attr span").on("tap",()=>{
        location.hash="#register";
    })
}

export default {
    render
}