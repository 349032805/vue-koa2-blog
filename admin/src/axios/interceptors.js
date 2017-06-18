import axios from 'axios';
import store from '../store/index.js';
import router from '../router';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

axios.interceptors.request.use((config) => {
    if(store.state.token.token){ //如果存在token,那么每个请求都得携带token上去
        config.headers.Authorization = `token ${store.state.token.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response){
        switch(error.response.status){
            case 401:
                store.commit('TOKEN_DELETE'); //可能是token失效，清楚它
                store.commit('RESET');
                router.replace({ //跳转到登录页面
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
        }
    }
    return Promise.reject(error);
});