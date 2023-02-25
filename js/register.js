import {testname,testpassword,testnickname} from '../utils/reg.js'
import {ajax } from '../utils/utils.js'
// 获取元素 

const form = document.querySelector('.form_register');
const username = document.querySelector('.name');
const password = document.querySelector('.pwd');
const rpassword = document.querySelector('.rpwd');
const nickname = document.querySelector('.nick');
const errBox = document.querySelector('.error');

//给表单绑定提交事件

form.addEventListener('submit',submitHandler);

async function submitHandler(e){
    e.preventDefault();  // 阻止默认行为


    // 获取用户输入的内容 
    const usernameVal = username.value.trim();
    const passwordVal = password.value;
    const rpasswordVal = rpassword.value;
    const nicknameVal = nickname.value.trim();


    // 验证数据

    if(!usernameVal || !passwordVal || !rpasswordVal || !nicknameVal){
        return alert('用户名或密码不能为空');
    }


    // 验证用户名和密码 昵称格式 
    if(!testname(usernameVal) || !testpassword(passwordVal) || !testpassword(rpasswordVal)|| !testnickname(nicknameVal)){
        return alert('用户名或密码格式或者昵称不正确');
    }

    // 验证两次密码是否一致
    if(passwordVal !== rpasswordVal){
        return alert('两次密码必须一致')
    }

    const info = await ajax({
        url:'/users/register',
        method:'POST',
        dataType:'json',
        data:{'username':usernameVal,'password':passwordVal,'nickname':nicknameVal,'rpassword':rpasswordVal},
    })


    // console.log(info);
    if(info.data.code === 0){
        return  errBox.style.display = 'block';

    }

    alert('注册成功,正在跳转到登录页面');

    window.location.href = '../views/login.html';
}

// 注册
//获取元素
const form1 = document.querySelector('.form_login');
const username1 = document.querySelector('.zhanghao');
const password1 = document.querySelector('.pwd-login');
const errorVal1 = document.querySelector('.error-login');

//给表单绑定提交事件

form1.addEventListener('submit',submitHandler1)

async function submitHandler1(e){
    e.preventDefault();  // 阻止默认行为


    // 获取表单数据
    const usernameVal1 = username1.value.trim();
    const passwordVal1 = password1.value;

    // 验证数据

    // 没有写用户名密码 
    if(!usernameVal1 || !passwordVal1){
        return alert('用户名或密码不能为空');
    }

    if(!testname(usernameVal1) || !testpassword(passwordVal1)){
        return alert('用户名或密码格式不正确');
    }

    const info = await ajax({url:'/users/login',method:'POST',dataType:'json',data:{'username':usernameVal1,'password':passwordVal1}})
    // console.log(info);
    if(info.data.code === 0){
        return  errorVal1.style.display = 'block';

    }


    window.localStorage.setItem('id',info.data.user.id);
    window.localStorage.setItem('token',info.data.token);


    window.location.href = '../views/index.html';

}