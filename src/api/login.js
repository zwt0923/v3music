import http from '../utils/http'
export default{
    //登录前生成二维码key
    loginGetKey(){
        return http.get(`/login/qr/key?timestamp=${Date.now()}`) 
    },
    //二维码生成接口
    loginCreate(params){
        return http.get('login/qr/create',{params}) 
    },
    //二维码检测扫描状态
    loginCheck(params){
        return http.get('login/qr/check',{params}) 
    },
    //退出登录
    logout(params){
        return http.get('logout',{params})  
    },
    //查询登录状态
    loginStatus(params){
        return http.get('login/status', {params});
    }
}