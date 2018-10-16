import ContentTel from '../views/ContentTel.html'
import profileTpl from '../views/profile.html'
import profileLogoTpl from '../views/profileLogo.html'
import profileShopTpl from '../views/profileshop.html'
import Backs from '../utils/back';

const render = () => {
  $('#root').html(ContentTel)
  if(sessionStorage.getItem("ID")){
    userlist()
  }else{
    $(".mll-main").html(profileTpl)
    $("#mlllogo").on("tap",()=>{
      location.hash="#admin"
    })
  }
  new Backs(".laye-back i").init()
}

const userlist = ()=>{
  var id=sessionStorage.getItem("ID");
  console.log(id) 
  $.ajax({
    type:"get",
    url:"/shoping",
    data:{
        user:id
    },
    success:function(data){
      if(data.status==0){
        $(".mll-main").html(profileLogoTpl)
      }else{
        var obj=JSON.parse(data);
        let usershop = Handlebars.compile(profileShopTpl)
        let html1 = usershop({obj})
        $(".mll-main").html(html1)
      }
    }
  })
}
export default {
  render
}