import * as types from '../mutation_types.js'

const state = {
    token: sessionStorage.getItem('token')
};

const mutations = {
    [types.TOKEN_CREATE]: ({ token }, val) => {
        token = val;
        sessionStorage.setItem('token', val);
    },
    [types.TOKEN_DELETE]: ({ token }) => {
        token = null;
        sessionStorage.removeItem('token');
    }
};

export default {
    state,
    mutations
}