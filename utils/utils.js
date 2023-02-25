
// {name:'张三',age:18','height':'181cm'}

// name=张三&age=18&height=181cm

// name=张三&
//age=18&
//height=181cm&
// solice(0,-1)  去掉最后一个&

function querystring(obj){
    let str = '';
    for(let key in obj){
        str += `${key}=${obj[key]}&`;
    }
    return str.slice(0,-1);
}


function createAjax(url){
    let baseUrl = url;
    function ajax(options = {}) {
        // 请求地址必须传
        if (!options.url) throw new Error('url is required');
    
        // 请求方法 可以不传   要传的话必须是get或者post 或者put 
       if( !(options.method === undefined || /^(GET|POST|PUT)$/i.test(options.method))){
            throw new Error('请求方式目前仅支持get,post,put');
       }
    
       // 是否是异步请求  默认是异步请求
        if(!(options.async === undefined || typeof options.async === 'boolean')){
            throw new Error('async 必须是布尔值');
        }
    
       // 是否携带参数 
       // 要么 不传  
       // 要么是个字符串 
       // 要么是个对象
        if(!(options.data === undefined || typeof options.data === 'string' || options.data.constructor === Object)){
            throw new Error('data 必须是字符串或者对象');
        }
    
    
        // 是否设置请求头  
        // 要么 不传 要么必须是个对象
        if(!(options.headers === undefined || options.headers.constructor === Object)){
            throw new Error('headers 必须是对象');
        }
    
        //返回的数据 要不要解析   
        // 要么 不传  默认是字符串   
        if( !(options.dataType === undefined || /^(string|json)$/i.test(options.dataType))){
            throw new Error('datatype 必须是string或者json');
       }       
      
    
       const _default = {
            url:baseUrl+options.url, // url 必须传
            method:options.method || 'GET', // 默认是get请求
            // ?? 只有左边undefined 或者 null 就取右边的值
            async:options.async ?? true,
            data:options.data || '',
            headers:{'content-type':'application/x-www-form-urlencoded',...options.headers},
            dataType:options.dataType || 'string',
       }
    
       // 走到这里 说明参数都是合法的
       // 也就是 如果传了data  是个对象 我们就把它转成查询字符串 
       if(typeof _default.data === 'object'){
           _default.data = querystring(_default.data);
       }
    
       // 如果是get请求  还传了一对象  
       
       if(/^GET$/i.test(_default.method) && _default.data){
            _default.url+='?'+_default.data
       }
     
    
       const mypromise = new Promise((resolve,reject)=>{
            // 创建ajax对象 
            const xhr = new XMLHttpRequest();
    
            // 配置地址 请求方式 是否异步
            xhr.open(_default.method,_default.url,_default.async);
            // 监听状态改变事件
    
            xhr.onload = function(){
                if(_default.dataType === 'string'){
                    resolve({code:1,msg:'success',data:xhr.responseText})
                }
    
                try{
                    const res = JSON.parse(xhr.responseText);
                    resolve({code:1,msg:'success',data:res})
                }catch(err){
                    resolve({code:0,msg:'fail',data:err})
                }
    
            }
    
            // 发送请求
            // headers {'content-type':'application/x-www-form-urlencoded','authorization':'adfdsafdsafsdfadsfadsfadsf}
            // 如果是post请求  还要设置请求头
    
    
            if(/^POST$/i.test(_default.method)){
                xhr.setRequestHeader('content-type',_default.headers['content-type']);
    
            }
            if(_default.headers.authorization){
                xhr.setRequestHeader('authorization',_default.headers.authorization);
            }
    
            /^POST$/i.test(_default.method)?xhr.send(_default.data):xhr.send();
       });
    
       return mypromise;
    
    }   

    return ajax;
}


import config from '../conf/conf.js';
export const ajax = createAjax(config.baseurl);
// 验证是否登录
export const testLogin = async function (success,error){
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    // console.log(id,token);
    if(!id || !token){``

        if(typeof error === 'function'){
            return error();
        }

        
        window.location.href = '../views/login.html';
        return;
    }

    //如果有id和token  请求个人信息接口
    const res = await ajax({
        url:'/users/info',
        data:{id},
        headers:{authorization:token},
        dataType:'json',
    })

    if(res.data.code === 0){
        if(typeof error === 'function'){
            return error();
        }
        window.location.href = '../views/login.html';
        return;
    }


    if(typeof success === 'function'){
        success(res);
        //如果成功就把获取的信息通过参数传输到页面上  
    }



}