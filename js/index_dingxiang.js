const id = window.localStorage.getItem('id');
const token = window.localStorage.getItem('token');
if(!id || !token){
    window.location.href='../views/register.html'
}