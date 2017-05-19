import axios from 'axios'

export default {
    //创建标签
    createTag(data){
        return axios.post('/api/tags', data);
    },
    //获取所有标签
    getAllTags(){
        return axios.get('/api/tags');
    },
    //修改单个标签
    modifyTag(id, data){
        return axios.patch(`/api/tags/${ id }`, data);
    },
    //删除单个标签
    deleteTag(id){
        return axios.delete(`/api/tags/${ id }`);   
    }
}
