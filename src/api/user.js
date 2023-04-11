import http from '../utils/http'
export default{
    userDetail(params){
        return http.get('user/detail',{params}) 
    },
    getUser(params={}){
        return http.get('user/account',{params})
    },
    detail(data){
        return http.post('user/detail',{data})
    }
}