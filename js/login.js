import { testname, testpassword } from "../utils/reg.js";
import { ajax } from "../utils/utils.js"

//获取元素
const form = document.querySelector('form');
const username = document.querySelector('.el-input>.name');
const password = document.querySelector('.pwd');
const btn = document.querySelector('.el-button');
const errorVal = document.querySelector('.error');

// btn.onclick = function () { 
//     alert(666)
//  }


//给表单绑定提交事件
btn.addEventListener('click', SubmitEvent);
async function SubmitEvent(e) {
    // e.preventDefault();//阻止默认行为


    //获取表单数据
    const usernameVal = username.value.trim();
    const passwordVal = password.value

    //验证数据

    //没有填写用户名或者密码
    if (!usernameVal || !passwordVal) {
        return alert('用户名或密码不能为空!')
    }

    //正则验证用户名或密码是否符合规范
    if (!testname(usernameVal) || !testpassword(passwordVal)) {
        return alert('用户名或密码格式不正确!!!')
    }

    const info = await ajax({ url: '/users/login', method: 'post', datatype: 'json', data: { 'username': usernameVal, 'password': passwordVal } })
    // console.log(info);
    if (JSON.parse(info.data).code === 0) {
        return errorVal.style.display = 'block'
    }
    window.localStorage.setItem('id', JSON.parse(info.data).user.id);
    window.localStorage.setItem('token',JSON.parse(info.data).token);

    window.location.href = '../views/index.html';
}