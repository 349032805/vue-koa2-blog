import * as types from '../mutation_types.js'
import L from '../../axios/login';

const state = {
    token: sessionStorage.getItem('blog-token')
};
//注册事件类型
const mutations = {
    [types.TOKEN_CREATE]: (state, val) => {
        state.token = val;
        sessionStorage.setItem('blog-token', val);
    },
    [types.TOKEN_DELETE]: (state) => {
        state.token = null;
        sessionStorage.removeItem('blog-token');
    }
};

const actions = {
    createToken({ commit }, { username, password }){
        return new Promise((resolve, reject) => {
            L.adminLogin({ username, password})
                .then(res => {
                    //登录成功
                    if(res.data.success === true){
                        let token = res.data.data.token;
                        commit(types.TOKEN_CREATE, token);
                        resolve(res.data.success);
                    }
                    //登录失败： 用户名或密码错误
                    if(res.data.success === false){
                        commit(types.TOKEN_DELETE);
                        resolve(res.data.success)
                    }
                })
                .catch(err => {
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