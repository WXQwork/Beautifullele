function Router() {
  this.routes = {}
  this.currentHash = ''
  //保存路由状态的数组
  this.steep = []
}

var noop = function () {}

// 路由注册
Router.prototype.route = function (hash, cb) {
  this.currentHash = hash
  this.routes[this.currentHash] = cb || noop
}

// 路由刷新
Router.prototype.refresh = function () {
  let hash = location.hash || '#position'
  if(localStorage.getItem("page")){
    let loop = JSON.parse(localStorage.getItem("page"))
    if(this.steep[this.steep.length-2]==loop[loop.length-1]){
      this.steep=loop
    }else{
      this.steep.push(hash)
    }
    localStorage.setItem("page",JSON.stringify(this.steep))
  }else{
    this.steep.push("#position")
    localStorage.setItem("page","#position")
  }
  this.currentHash = hash
  this.routes[this.currentHash]()
  this.switchTabbar()
}

// tabbar switch
Router.prototype.switchTabbar = function () {
  let hashs = ['#position', '#search', '#profile','#admin']
  let index = hashs.indexOf(this.currentHash)
  $('nav li')
    .eq(index)
    .addClass('active')
    .siblings()
    .removeClass('active')
}

// 路由切换监听
Router.prototype.init = function () {
  window.addEventListener('load', this.refresh.bind(this))
  window.addEventListener('hashchange', this.refresh.bind(this))
}

export default Router