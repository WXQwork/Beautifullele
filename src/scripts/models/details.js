const details = () => {
    return $.ajax({
        url:'/category-9999/list-b653-s400-p2-o7/',
        type:"get",
        data:'level=&from=page&ajax=1',
        success:(result)=>{
            return result;
        }
    })
}

export default{
    details
}