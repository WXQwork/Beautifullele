import ContentTel from '../views/ContentTel.html'
import profileTpl from '../views/profile.html'
import profileLogoTpl from '../views/profileLogo.html'
import profileShopTpl from '../views/profileshop.html'
import Backs from '../utils/back';

const render = () => {
  $('#root').html(ContentTel)
  if(sessionStorage.getItem("ID")){
    // $(".mll-main").html(profileLogoTpl)
    $(".mll-main").html(profileShopTpl)
  }else{
    $(".mll-main").html(profileTpl)
    $("#mlllogo").on("tap",()=>{
      location.hash="#admin"
    })
  }
  new Backs(".laye-back i").init()
}

export default {
  render
}