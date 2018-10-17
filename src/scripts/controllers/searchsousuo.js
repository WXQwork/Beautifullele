import searchsousuo from '../views/search-sousuo.html'
// import homeCon from './home'

const render = () => {
    $('#root').html(searchsousuo)
    eventTap()
}

const eventTap = () => {
    $('.search-ipt input').on('tap', function () {
        this.value = "";
    })
    $('.head .btn').on('tap', function () {
        location.hash = "#search"
    })
}

export default {
    render
}
