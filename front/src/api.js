import axios from 'axios';

axios.defaults.timeout = 5000;

export default {
    //获取单个文章
    getArticleById(id){
        return axios.get(`/api/articles/${ id }`);
    },
    //获取所有文章
    getAllArticles(){
        return axios.get('/api/articles');
    },
    //根据标签id获取文章
    getArticleByTagId(tagId){
        return axios.get(`/api/articles?tag=${ tagId }`);
    },
    //根据分页获取文章
    getArticlesByPage(page, limit){
        return axios.get(`/api/articles?page=${ page }&limit=${ limit }`);
    },
    //获取所有标签
    getAllTags(){
        return axios.get('/api/tags');
    },
    //获取个人信息
    getMeInfo(){
        return axios.get('/api/me');
    }
}