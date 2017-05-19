import * as types from '../mutation_types.js'

const state = {
    token: sessionStorage.getItem('token')
};

const mutations = {
    [types.TOKEN_CREATE]({ token }, val){  //解构赋值
        token = val;
        window.sessionStorage.setItem('token') = val;
    },
    [types.TOKEN_DELETE]({ token }){
        token = null;
        window.sessionStorage.removeItem('token');
    }
};

export default {
    state,
    mutations
}