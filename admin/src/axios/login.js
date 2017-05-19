import axios from 'axios'

export default {
    //用户登录
    adminLogin(data){
        return axios.post('/api/login', data);
    },
    //用户登出
    adminLogout(){
        return axios.post('/api/logout')
    },
    //更新admin信息
    updAdminMes(data){
        return axios.post('/api/modifyUser', data);
    },
    //更新admin密码
    updAdminPwd(data){
        return axios.post('/api/modifyPwd', data);
    }
}