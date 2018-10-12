import adminTpl from "../views/admin.html"

const render = ()=>{
    $("#root").html(adminTpl)
    $(".ad-header i").on("tap",()=>{
        location.hash="#position";
    })
}

export default {
    render
}