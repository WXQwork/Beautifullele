import searchTpl from '../views/search.html'
import homeCon from "./home"

const render = () => {
  homeCon.render()
  $("header").remove()
  $('main').html(searchTpl)
}

export default {
  render
}