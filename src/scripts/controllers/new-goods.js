import newGoodsTpl from "../views/new-goods.html";
const render = ()=>{
    /* let template = Handlebars.compile(newGoodsTpl); */
    $('#root').html(newGoodsTpl);
}

export default {
    render
};