import positionTpl from '../views/position.html'
import position_listTpl from '../views/position_list.html'
import position_timeTpl from '../views/position_time.html'
import positionModel from '../models/position'
import homeCon from "./home"
import { __await } from 'tslib';

const render = () =>{
  homeCon.render();
  $("main").html(positionTpl);
  scollall();
  time();
  color();
  list();
   lunbo();
}

const color =async ()=>{
  let result = await positionModel.list();    //限时抢购
  let list = result.result["2018Msy_tg"].goods_info;
  $(".positon_flashTime_content").each(function(i){
    let endd = $($($(this).children()[0]).children()[0]).attr("data-end");
    let end = endd.padEnd(13,"0");
    let startt = $($($(this).children()[0]).children()[0]).attr("data-start");
    let start = startt.padEnd(13,"0");
    let d = new Date();
    if((end - d.getTime())>0){
      //没有结束
         if((d.getTime()-start)>0){
           //已经开始了
           $($($(this).children()[0]).children()[0]).text("抢购中");
           $($($(this).children()[0]).children()[0]).css("background","#ff7a6a");
           var lastTimecDown = cDown(d.getTime()-start);
           $($($(this).children()[1]).children()[0]).text("仅剩"+lastTimecDown.day+"天"+lastTimecDown.h+
           ":"+lastTimecDown.m+":"+lastTimecDown.s);
         }else{
          var lastTimecDown = cDown(start-d.getTime());
          $($($(this).children()[1]).children()[0]).text(lastTimecDown.day+"天"+lastTimecDown.h+
          ":"+lastTimecDown.m+":"+lastTimecDown.s+"后开始");
         }
    }else{
      $($($(this).children()[0]).children()[0]).text("已结束");
      $($($(this).children()[0]).children()[0]).css("background","#aaa");
      $($($(this).children()[1]).children()[0]).text("已结束");
      $($($(this).children()[1]).children()[0]).css("background","#aaa");
    }
  });
}

function cDown(time){
	let day = Math.floor(time/(24*60*60*1000));
	let h = Math.floor(time%(24*60*60*1000)/(60*60*1000));
	let m = Math.floor(time%(24*60*60*1000)%(60*60*1000) / (60*1000));
  let s = Math.floor((time%(24*60*60*1000)%(60*60*1000) % (60*1000) / 1000));
	return {
		day:day,
		h:h,
		m:m,
		s:s
	}
}
const lunbo =async ()=>{
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
}

const scollall = () =>{
  let posScroll = new BScroll('main', {
    probeType: 2,
    scrollY:true
})
}
const time =async () => {
  //渲染限时抢购
  let result = await positionModel.list();    //限时抢购
  let list = result.result["2018Msy_tg"].goods_info;
  var wid = list.length*1.46;
  //设置限时抢购的宽
  $(".positon_flashTime_con").css("width",wid+"rem");
  let template = Handlebars.compile(position_timeTpl);
  let html2 = template({ list });
  $(".positon_flashTime_con").html(html2);
//bscroll
  scoll();
}

const scoll = () =>{
  let posScroll = new BScroll('.positon_flashTime_con1', {
    probeType: 2,
    scrollX:true
})
}
const list = async () => {
  let result1 = await positionModel.list1();     //猜你喜欢
  let list1 = result1.result;
  let template1 = Handlebars.compile(position_listTpl);
  let html1 = template1({ list1 });
  $(".position_guess_div").html(html1);
}
export default {
  render
}