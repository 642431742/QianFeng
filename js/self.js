import {testnickname} from '../utils/reg.js'
import {ajax,testLogin } from '../utils/utils.js'


// 获取元素

const form = document.querySelector('.myself-info-form');
const usernameInp = document.querySelector('.myself-info-name');
const nicknameInp = document.querySelector('.myself-info-nick');
const ageInp = document.querySelector('.myself-info-age');
const genderInp = document.querySelector('.myself-info-gender');


// 验证是否登录 

testLogin();

const id = localStorage.getItem('id');
const token = localStorage.getItem('token');

// 渲染数据

ajax({
    url:'/users/info',
    data:{id},
    dataType:'json',
    headers:{'authorization':token}
}).then(
    res=>{
        const {username,age,gender,nickname} = res.data.info;
        // console.log(username,age,gender,nickname)
        // username.value = username;
        // alert(username);
        usernameInp.value = username;
        nicknameInp.value = nickname;
        ageInp.value = age;
        genderInp.value = gender;
    }
)


// 给表单绑定提交事件

form.addEventListener('submit',submitHandler);


async function submitHandler(e){
    e.preventDefault();  // 阻止默认行为

    const data = {id};
    if(nicknameInp.value){
        data.nickname = nicknameInp.value;
    }

    if(ageInp.value){
        data.age = ageInp.value;
    }


    if(genderInp.value){
        data.gender = genderInp.value;
    }

    const info = await ajax({
        url:'/users/update',
        method:'POST',
        dataType:'json',
        headers:{'authorization':token},
        data

    })

    if(info.data.code === 1){
        alert('修改成功');
        location.href = '../views/index.html';
    }
}

const shouye = document.querySelector('.shouye');
const lunbo = document.querySelector('.swiper');
const myself_info = document.querySelector('.myself-info');
const self_data = document.querySelector('.self-data')
shouye.onclick = function(e){
    e.preventDefault()
    lunbo.classList.remove('hid');
    myself_info.classList.add('hid');
}
self_data.onclick = ()=>{
    myself_info.classList.remove('hid');
    lunbo.classList.add('hid');
}