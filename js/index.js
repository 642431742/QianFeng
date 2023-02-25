import { testLogin } from "../utils/utils.js";
import { ajax } from "../utils/utils.js";
const nameVal = document.querySelector('.menu>.self>.name')
testLogin(res => {
    // console.log(res);
    nameVal.innerText = res.data.info.nickname;

}, () => {
    // window.location='../views/login.html'
})

const exit = document.querySelector('.self-leave');
exit.onclick = async() => {
    if (!window.confirm('确认退出吗'))return
    // 删除本地token
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    // 发送退出登录请求
    // await ajax({
    //     url: 'http://localhost:8888/users/logout',
    //     data: { id }
    // })

    // 刷新页面
    location.reload();
}

