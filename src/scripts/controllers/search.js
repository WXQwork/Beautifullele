import searchTpl from '../views/search.html'
import homeCon from "./home"
// import BScroll from '../../libs/bscroll.min.js'

const render = () => {
  homeCon.render()
  $("header").remove()
  $('main').html(searchTpl)
  scrollLeft()
}

const scrollLeft = () => {
  let scroll = new BScroll('.class-mid-left', {
    scrollY: true
  })
  scroll.on('scrollEnd', () => {
    this.scrollTo(0, 0, 500)
  })
}



export default {
  render
}