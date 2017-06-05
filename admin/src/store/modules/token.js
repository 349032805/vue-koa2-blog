import * as types from '../mutation_types.js'
import L from '../../axios/login';

const state = {
    token: sessionStorage.getItem('blog-token')
};
//注册事件类型
const mutations = {
    [types.TOKEN_CREATE]: ({ token }, val) => {
        token = val;
        sessionStorage.setItem('blog-token', val);
    },
    [types.TOKEN_DELETE]: ({ token }) => {
        token = null;
        sessionStorage.removeItem('blog-token');
    }
};

const actions = {
    createToken({ commit }, { username, password }){
        return new Promise((resolve, reject) => {
            L.adminLogin({ username, password})
                .then(response => {
                    console.log(response);
                    let result = response.data;
                    if(result.success === true){
                        let token = result.data.token;
                        console.log('登录成功返回的token:' + token);
                        commit(types.TOKEN_CREATE, token);
                    }else{
                        commit(types.TOKEN_DELETE);
                    }
                    //resolve出去，这样能在组件中知道该action什么时候结束
                    resolve(response);
                })
                .catch(err => {
                    console.log('actions登录请求错误');
                    reject(err);
                });
        });
    }
};

export default {
    state,
    mutations,
    actions
}