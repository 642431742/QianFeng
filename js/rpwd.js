import {testpassword} from '../utils/reg.js'
import {ajax,testLogin } from '../utils/utils.js'



testLogin((res)=>{
    console.log(res);
},()=>{
    console.log('未登录');
})


// 获取元素

const form = document.querySelector('.updata-pwd-form');
const oldword = document.querySelector('.updata-pwd-oldPwd');
const newword = document.querySelector('.updata-pwd-newPwd');
const rpwd = document.querySelector('.updata-pwd-rpwd');

const id = localStorage.getItem('id');
const token = localStorage.getItem('token');

//给表单绑定提交事件

form.addEventListener('submit',submitHandler);

async function submitHandler(e){
    e.preventDefault();  // 阻止默认行为

    // 获取用户输入的内容   

    const newpass = newword.value;
    const oldpass = oldword.value;
    const rpassword = rpwd.value;

    // 验证数据

    if(!newpass || !oldpass || !rpassword){
        return alert('密码不能为空');
    }

    // 验证密码格式

    if(!testpassword(newpass) || !testpassword(oldpass) || !testpassword(rpassword)){
        return alert('密码格式不正确');
    }
    
    // 验证两次密码是否一致

    if(newpass !== rpassword){
        return alert('两次密码必须一致')
    }

    // 发送请求
    const info = await ajax({
        url:'/users/rpwd',
        method:'POST',
        dataType:'json',
        headers:{'authorization':token},
        data:{'id':id,'oldPassword':oldpass,'newPassword':newpass,'rNewPassword':rpassword},

    })

    // console.log(info);
    // 判断是否修改成功
    if(info.data.code === 0){
        errBox.innerText = info.data.message;
        errBox.classList.add('active');
        return

    }

    if(info.data.code === 1){
        alert('修改成功请重新登录');
        window.location.href = '../views/register.html';
        return 
    }
}

const shouye = document.querySelector('.shouye');
const lunbo = document.querySelector('.swiper');
const self_revise = document.querySelector('.self-revise');//修改密码
const updata_pwd = document.querySelector('.updata-pwd')
shouye.onclick = function(e){
    e.preventDefault()
    lunbo.classList.remove('hid');
    myself_info.classList.add('hid');
}
self_revise.onclick = ()=>{
    updata_pwd.classList.remove('hid');
    lunbo.classList.add('hid');
}