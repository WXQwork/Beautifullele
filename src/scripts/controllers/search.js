import searchTpl from '../views/search.html'
import homeCon from "./home"
// import search from './searchsousuo'

const render = () => {
  homeCon.render()
  $("header").remove()
  $('main').html(searchTpl)
  scrollLeft()
  scrollRight()
  myEvent()
}

const scrollLeft = () => {
  let scroll = new BScroll('.class-mid-left', {
    scrollY: true
  })
}

const scrollRight = () => {
  let scroll = new BScroll('.class-mid-right', {
    scrollY: true
  })
}

const myEvent = () => {
  $('.class-mid-left ul li').on('tap', function () {
    $(this).addClass('current').siblings().removeClass('current')
    $('.class-mid-right .content>div').eq($(this).index()).css('display', 'block').siblings().css('display', 'none')
  })
  $('.search').on('tap', function () {
    location.hash = "#searchsousuo"
  })
}

export default {
  render
}