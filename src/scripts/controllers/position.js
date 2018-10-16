import positionTpl from '../views/position.html'
import position_listTpl from '../views/position_list.html'
import position_timeTpl from '../views/position_time.html'
import positionModel from '../models/position'
import homeCon from "./home"
import { __await } from 'tslib';

const render =async () => {
  homeCon.render();
  $("main").html(positionTpl);
  scollall();
  time();
  color();
  await list();
  lunbo();
  clickList();
}
const clickList = ()=>{
  console.log($(".position_guess_div_con"));
  $(".position_guess_div_con").on("tap",function (){
    var id = $(this).attr("id");
    location.href="http://localhost:7777/?id="+id;
  })
}

const color = async () => {
  let result = await positionModel.list();    //限时抢购
  let list = result.result["2018Msy_tg"].goods_info;
  conStyle($(".positon_flashTime_content"));
}

const conStyle =(con_name) => {
  con_name.each(function (i) {
    let endd = $(this).children().eq(0).children().eq(0).attr("data-end");
    let end = endd.padEnd(13, "0");
    let startt = $(this).children().eq(0).children().eq(0).attr("data-start");
    let start = startt.padEnd(13, "0");
    let d = new Date();
    if ((end - d.getTime()) > 0) {
      //没有结束
      if ((d.getTime() - start) > 0) {
        //已经开始了
        $(this).children().eq(0).children().eq(0).text("抢购中");
        $(this).children().eq(0).children().eq(0).css("background", "#ff7a6a");
        let lastTime = d.getTime() - start;
        // console.log(i)
         countDown(lastTime, $(this),i);
        
      } else {
        $(this).children().eq(0).children().eq(0).text("即将开始");
        $(this).children().eq(0).children().eq(0).css("background", "#dcb687");
        let lastTime = d.getTime() - start;
        // console.log(i)
        countDown(lastTime, $(this),i);
     
      }
    } else {
      $(this).children().eq(0).children().eq(0).text("已结束");
      $(this).children().eq(0).children().eq(0).css("background", "#aaa");
      $(this).children().eq(1).children().eq(0).text("已结束");
      $(this).children().eq(1).children().eq(0).css("background", "#aaa");
    }
  });

}

async function  countDown(time, _this,i) {
  let _time = time
  _this.timer = null;
  // console.log(i)

  _this.timer =await (  setInterval(function () {
    // console.log(i)
    
    if (_time > 0) {
      // let day=0;
      // let hour=0;
      // let minute=0;
      // let second=0;//时间默认值
     let day = Math.floor(_time / (24 * 60 * 60 * 1000));
     let hour = Math.floor(_time % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
     let minute = Math.floor(_time % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
     let second = Math.floor((_time % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000));
    if (day <= 9) day = '0' + day;
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    //
    // console.log(day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒");
    _time = _time - 1000;
    _this.children().eq(1).children().eq(0).text("仅剩" + day + "天" + hour +
      ":" + minute + ":" + second);
    }

  }, 1000))
  if (time <= 0) {
    clearInterval(_this.timer);
  }
}








const lunbo = async () => {
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
        clickable :true,

    }
  })
}

const scollall = () => {
  let posScroll = new BScroll('main', {
    probeType: 2,
    scrollY: true
  })
}
const time = async () => {
  //渲染限时抢购
  let result = await positionModel.list();    //限时抢购
  let list = result.result["2018Msy_tg"].goods_info;
  var wid = list.length * 1.46;
  //设置限时抢购的宽
  $(".positon_flashTime_con").css("width", wid + "rem");
  let template = Handlebars.compile(position_timeTpl);
  let html2 = template({ list });
  $(".positon_flashTime_con").html(html2);
  //bscroll
  scoll();
}

const scoll = () => {
  let posScroll = new BScroll('.positon_flashTime_con1', {
    probeType: 2,
    scrollX: true
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