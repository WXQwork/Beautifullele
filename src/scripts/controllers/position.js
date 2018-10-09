import positionTpl from '../views/position.html'
import positionModel from '../models/position'

const render= async()=>{
    let result= await positionModel.list();
    let list = result.content.data.page.result
    let template = Handlebars.compile(positionTpl)
    let html=template({list})
    $("main").html(html)
}

export default {
    render
}