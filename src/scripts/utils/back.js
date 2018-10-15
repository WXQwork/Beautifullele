function Backs(el){
    this.el = el
}
Backs.prototype.init = function(){
    $(this.el).on("tap",()=>{
        if(localStorage.getItem("page")){
            let page = localStorage.getItem("page")
            page = JSON.parse(page)
            page.splice(page.length-1,1)
            localStorage.setItem("page",JSON.stringify(page)) 
            location.hash = page[page.length-1] 
        }
    })
}


export default Backs