const list=()=>{
    return $.ajax({
        url:"/api/position/list",
        success:(result)=>{
            console.log(result)
            return result
        }
    })
}
module.exports = {
    list
}