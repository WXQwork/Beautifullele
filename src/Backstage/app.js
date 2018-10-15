const express=require("express");
const fs=require("fs");
const url=require("url");
const proxy=require("http-proxy-middleware");
const rem=require("./src/js/js/tool")

const app=express();
app.use("/jsonp",proxy({
    target:"https://mce.mogucdn.com",
    changeOrigin:true
}))
app.use("/v4",proxy({
    target:"https://m.maizuo.com",
    changeOrigin:true
}))
app.use("/ajax",proxy({
    target:"https://shop.mogujie.com",
    changeOrigin:true
}))
app.use("/ajax",proxy({
    target:"https://gapi.wbiao.cn",
    changeOrigin:true
}))


app.use("/image",express.static("./src/image"))
app.use("/css",express.static("./src/css"))
app.use("/js",express.static("./src/js"))
app.use("/json",express.static("./src/json"))

app.get("/",(req,res)=>{
    fs.readFile("./src/html/index.html",(err,data)=>{
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.end(data);
    })
});
app.get("/detalis.html",(req,res)=>{
    fs.readFile("./src/html/detalis.html",(err,data)=>{
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.end(data);
    })
});
app.get("/sign.html",(req,res)=>{
    fs.readFile("./src/html/sign.html",(err,data)=>{
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.end(data);
    })
});
app.get("/register.html",(req,res)=>{
    fs.readFile("./src/html/register.html",(err,data)=>{
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.end(data);
    })
});
app.get("/cart.html",(req,res)=>{
    fs.readFile("./src/html/cart.html",(err,data)=>{
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.end(data);
    })
});
app.get("/regis",(req,res)=>{
    const {query}=url.parse(req.url,true);
    fs.readFile("./src/json/uasename.json",(err,data)=>{
        var str=data+"";
        if(str==""){
            var arr=[];
            let querys={
                phone:query.phone,
                password:query.password
            }
            arr.push(querys);
            fs.writeFile("./src/json/uasename.json",JSON.stringify(arr),(err)=>{});
            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
            let obj={info:"注册成功",status:1};
            res.end(JSON.stringify(obj));
        }else{
            let data=JSON.parse(str);
            let querys={
                phone:query.phone,
                password:query.password
            }
            data.push(querys);
            fs.writeFile("./src/json/uasename.json",JSON.stringify(data),(err)=>{});
            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
            let obj={info:"注册成功",status:1};
            res.end(JSON.stringify(obj));
        }
    })
})
app.get("/phone",(req,res)=>{
    const {query}=url.parse(req.url,true);
    if(query.phone){
        var bStop=true;
        fs.readFile("./src/json/uasename.json",(err,data)=>{
            var str=data+"";
            if(str==""){
                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                let obj={info:"用户名不存在！",status:1};
                res.end(JSON.stringify(obj));
            }else{
                let objs=JSON.parse(str);
                for(let key in objs){
                    if(query.phone==objs[key].phone){
                        bStop=false;
                    }
                }
                if(bStop){
                    res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                    let obj={info:"用户名不存在！",status:1};
                    res.end(JSON.stringify(obj));
                }else{
                    res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                    let obj={info:"用户名已存在！",status:0};
                    res.end(JSON.stringify(obj));
                }   
            }
        })
    }else{
        res.writeHead(200,{"content-type":"application/json;charset=utf8"});
        let obj={info:"用户名不存在！",status:1};
        res.end(JSON.stringify(obj));
    }
})
app.get("/logn",(req,res)=>{
    const {query}=url.parse(req.url,true);
    var bStop=true;
    fs.readFile("./src/json/uasename.json",(err,data)=>{
        var str=data+"";
        let objs=JSON.parse(str);
        for(let key in objs){
            if(query.use==objs[key].phone&&query.pas==objs[key].password){
                bStop=false;
            }
        }
        if(!bStop){
            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
            let obj={info:"登录成功！",status:1,id:query.use};
            res.end(JSON.stringify(obj));
        }else{
            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
            let obj={info:"登录失败！",status:0};
            res.end(JSON.stringify(obj));
        }
    })
})
app.get("/gobuy",(req,res)=>{
    const {query}=url.parse(req.url,true);
    fs.readFile("./src/json/s"+query.user+".json",(err,data)=>{
        var str=data+"";
        if(str=="undefined"){
            var arr=[];
            var num=parseInt(query.num);
            let querys={
                iid:query.iid,
                img:query.img,
                price:query.price,
                tit:query.tit,
                num:num
            }
            arr.push(querys);
            fs.writeFile("./src/json/s"+query.user+".json",JSON.stringify(arr),(err)=>{});
            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
            let obj={info:"加入购物车成功",status:1};
            res.end(JSON.stringify(obj));
        }else{
            let data=JSON.parse(str);
            let bStop=true;
            for(let key in data){
                if(data[key].iid==query.iid){
                    var ha=parseInt(query.num);
                    data[key].num=parseInt(data[key].num)+ha;
                    fs.writeFile("./src/json/s"+query.user+".json",JSON.stringify(data),(err)=>{});
                    res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                    let obj={info:"再次加入购物车成功",status:1};
                    res.end(JSON.stringify(obj));
                    bStop=false;
                }
            }
            if(bStop){
                var num=parseInt(query.num);
                let querys={
                    iid:query.iid,
                    img:query.img,
                    price:query.price,
                    tit:query.tit,
                    num:num
                }
                data.push(querys);
                fs.writeFile("./src/json/s"+query.user+".json",JSON.stringify(data),(err)=>{});
                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                let obj={info:"加入购物车成功",status:1};
                res.end(JSON.stringify(obj));
            }
        }
    })
})
app.get("/shoping",(req,res)=>{
    const {query}=url.parse(req.url,true);
    fs.readFile("./src/json/s"+query.user+".json",(err,data)=>{
        var str=data+"";
        res.writeHead(200,{"content-type":"application/json;charset=utf8"});
        res.end(JSON.stringify(str));
    })
})
app.get("/change",(req,res)=>{
    const {query}=url.parse(req.url,true);
    fs.readFile("./src/json/s"+query.user+".json",(err,data)=>{
        let str=data+"";
        var datas=JSON.parse(str);
        let cz=query.cz;
        switch (cz){
            case "0":
                for(let key in datas){
                    if(datas[key].iid==query.iid){
                        datas[key].num++;
                        break; 
                    }
                }
                fs.writeFile("./src/json/s"+query.user+".json",JSON.stringify(datas),(err)=>{});
                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                var obj={info:"增加商品成功",status:1};
                res.end(JSON.stringify(obj));
                break;
            case "1":
                for(let key in datas){
                    if(datas[key].iid==query.iid){
                        if(datas[key].num!=1){
                            datas[key].num--;
                        }
                        break; 
                    }
                }
                fs.writeFile("./src/json/s"+query.user+".json",JSON.stringify(datas),(err)=>{});
                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                var obj={info:"删除商品成功",status:1};
                res.end(JSON.stringify(obj));
                break;
            case "2":
                for(let key in datas){
                    if(datas[key].iid==query.iid){
                        datas=rem.removearr(datas,key);
                        break; 
                    }
                }
                fs.writeFile("./src/json/s"+query.user+".json",JSON.stringify(datas),(err)=>{});
                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                var obj={info:"删除某个商品成功",status:1};
                res.end(JSON.stringify(obj));
                break;
        }
    })
})


app.get("/js/jquery-1.11.3.js",(req,res)=>{
    res.writeHead(200,{"content-type":"application/x-javascript;charset=utf8"});
    fs.readFile("./js/jquery-1.11.3.js",(err,data)=>{
        res.end(data)
    })
});
app.get("/json/indextop.json",(req,res)=>{
    res.writeHead(200,{"content-type":"application/json;charset=utf8"});
    fs.readFile("./src/json/indextop.json",(err,data)=>{
        res.end(data);
    })
});

app.listen(8888,()=>{
    console.log("Express app listening on port 8888");
})