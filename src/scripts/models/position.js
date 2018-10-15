// const list=()=>{
//     return $.ajax({
//         url:"/api/position/list",
//         success:(result)=>{
//             console.log(result)
//             return result
//         }
//     })
// }
const list=()=>{
    return $.ajax({
        url:"/mob_api/app_tg_goods",
        success:(result)=>{
            // console.log(result.result["2018Msy_tg"].goods_info)
            return result
        }
    })
}
const list1=()=>{
    return $.ajax({
        url:"/dubbo_api/mll/articleAd/getLikeProducts?userTags=k0603*k0103&pagSize=50&cid=t5gjn1mw5z7_9084030",
        success:(result)=>{
            return result
        }
    })
}


module.exports = {
    list,
    list1
}


