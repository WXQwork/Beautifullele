import ContentTel from '../views/ContentTel.html'
import profileTpl from '../views/profile.html'
import profileLogoTpl from '../views/profileLogo.html'
import profileShopTpl from '../views/profileshop.html'
import Backs from '../utils/back';

const render = () => {
  $('#root').html(ContentTel)
  changeTab()
  if (sessionStorage.getItem("ID")) {
    userlist()
  } else {
    $(".mll-main").html(profileTpl)
    $("#somego").on("tap",()=>{
      location.hash="#top2"
    })
    $("#mlllogo").on("tap", () => {
      location.hash = "#admin"
    })
  }
  new Backs(".laye-back i").init()
}

const changeTab =()=>{
  $(".navfooter li").on("tap",function(){
      let hashs = ['#position', '#search', '#profile','#admin']
      location.hash = hashs[$(this).index()]
      $(this).addClass('active').siblings().removeClass('active')
  })
}

const userlist = () => {
  var def = $.Deferred();
  var id = sessionStorage.getItem("ID");
  $.ajax({
    type: "get",
    url: "/shoping",
    data: {
      user: id
    },
    success: function (data) {
      if (data.status == 0) {
        $(".mll-main").html(profileLogoTpl)
        $("#somego").on("tap",()=>{
          location.hash="#top2"
        })
      } else {
        console.log(data)
        var obj = JSON.parse(data);
        let usershop = Handlebars.compile(profileShopTpl)
        let html1 = usershop({ obj })
        $(".mll-main").html(html1)
        def.resolve(id);
      }
    }
  })
  return def.promise();
}

userlist().then(function (id) {
  $(".mll-main").on('tap', (event) => {
    var target = $(event.target);
    if (event.target.className == "add") {
      var num = target.prev().val()
      var iid = target.parent().parent().parent().parent().attr("data-iid")
      num++
      target.prev().val(num)
      $.ajax({
        type: "get",
        url: "/change?cz=0&iid=" + iid + "&user=" + id,
        success: function (data) {
          console.log(data);
          // target.parent().next().find("em").text(Number(target.prev().val())*parseFloat(target.parent().prev().find("em").text()));
          // totlePri();
          // numsum();
        }
      })
    }
    if (event.target.className == "rem") {
      var num = target.next().val()
      var iid = target.parent().parent().parent().parent().attr("data-iid")
      if (num <= 1) {
        num = 1;
        target.next().val(num);
      } else {
        num--;
        target.next().val(num);
        $.ajax({
          type: "get",
          url: "/change?cz=1&iid=" + iid + "&user=" + id,
          success: function (data) {
            console.log(data);
            // target.parent().next().find("em").text(Number(target.next().val()) * parseFloat(target.parent().prev().find("em").text()));
            // totlePri();
            // numsum();
          }
        })
      }
    }
    if (event.target.className == "yo-ico remall") {
      var iid = target.parent().parent().parent().parent().attr("data-iid");
      $.ajax({
        type: "get",
        url: "/change?cz=2&iid=" + iid + "&user=" + id,
        success: function (data) {
          console.log(data);
          target.parent().parent().parent().parent().remove();
          // totlePri();
          // numsum();
        }
      })
    }

  })
})

export default {
  render
}