import axios from 'axios'

export default {
    //修改个人信息
    modifyMeInfo(content){
        return axios.patch('/api/me', { content });
    },
    //获取个人信息
    getMeInfo(){
        return axios.get('/api/me');
    }
}