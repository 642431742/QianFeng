import config from "../conf/conf.js";

function mytest(reg) { 
    return function (str) { 
        return reg.test(str)
     }
}

export const testname = mytest(config.username);
export const testpassword = mytest(config.password);
export const testnickname = mytest(config.nickname)
