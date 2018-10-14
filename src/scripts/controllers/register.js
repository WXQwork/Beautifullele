import registerTpl from  "../views/register.html"
import Backs from '../utils/back';
import Visiter from "../utils/visiter"

const render = ()=>{
    $("#root").html(registerTpl)
    new Backs(".re-height i").init()
    viliter()
}

const viliter = ()=>{
    new Visiter({
        el:"#moblie",
        tishi:"输入的手机号不能为空!",
        reg:/^1[34578]\d{9}$/,
        regt:"请输入正确的手机号格式!",
        phonesame:"此账号以存在！"
    }).init();
    new Visiter({
        el:"#password",
        tishi:"输入的密码不能为空!",
        reg:/^[a-z0-9_-]{6,18}$/,
        regt:"请输入正确的密码格式!"
    }).init();
    new Visiter({
        el:"#confirm_password",
        tishi:"输入的密码不能为空!",
        same:"#password",
        samet:"两次输入密码不一致!"
    }).init();
    new Visiter({el:"#register"}).gogo()
}

export default {
    render
}