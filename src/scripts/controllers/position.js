import positionTpl from '../views/position.html'
import position_listTpl from '../views/position_list.html'
import positionModel from '../models/position'
import homeCon from "./home"
import { __await } from 'tslib';

const render = async () => {
  homeCon.render();
  $("main").html(positionTpl);
  //banner轮播图
  var mySwiper = await new Swiper('.swiper-container', {
    autoplay: true,//可选选项，自动滑动
    loop: true,//无缝轮播
    // pagination: '.pagination',
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      //   clickable :true,
    }
  })
  //轮播图
  var mySwiper1 = await new Swiper('.swiper-container1', {
    // autoplay: true,//可选选项，自动滑动
    // loop:true,//无缝轮播
    // pagination: '.pagination',
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      //   clickable :true,

    }
  })
  
  let result = await positionModel.list();    //限时抢购
  // let list =result.result["2018Msy_tg"].goods_info;
  // let template = Handlebars.compile(position_listTpl)
  // let html = template({ list });
  // $("position_guess").html(html);
  let result1 = await positionModel.list1();     //猜你喜欢
   let list1 =result1.result;
  let template = Handlebars.compile(position_listTpl);
  let html1 = template({ list1 });
  $(".position_guess_div").html(html1);
}




export default {
  render
}