import axios from 'axios'

export default {
    //获取单个文章
    getArticleById(id){
        return axios.get(`/api/articles/${ id }`);
    },
    //创建文章
    createArticle(data){
        return axios.post('/api/articles', data);
    },
    //删除文章
    deleteArticleById(id){
        return axios.delete(`/api/articles/${ id }`);
    },
    //修改文章
    modifyArticle(id, data){
        return axios.patch(`/api/articles/${ id }`, data);
    },
    //获取所有文章
    getAllArticles(){
        return axios.get('/api/allArticles');
    },
     //获取所以已发布的文章
    getAllPublishedArticles(){
        return axios.get('/api/articles');
    },
    //发布或者不发布文章
    ifPubArticles(id, boolean){
        return axios.patch(`/api/pubArticles/${ id }`, { publish : boolean });
    }
}