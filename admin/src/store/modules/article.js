import * as types from '../mutation_types.js';
import A from '../../axios/article.js';
import T from '../../axios/tag.js';

const state = {
    currentArticle: {
        _id: -1,     //当前文章id
        index: -1,   //当前文章在文章数组中的位置
        content: '',    //内容
        title: '',      //标题
        tags: [],       //标签数组：只存放标签_id字符串，不是对象数组
        publish: false, //发布
        save: false,     //存储
    },
    allArticles: [],  //存放"文章管理"页发送请求后的所有文章
    allTags: []         //存放"标签管理"页发送请求后的所有标签
};

const mutations = {
    //创建标签，并push进currentArticle.tags里面
     [types.TAG_CREATE](state, tag){
         state.currentArticle.tags.push(tag);
     },
     //删除标签,index是要删除tag在currentArticle.tags里面的索引
     [types.TAG_DELETE](state, index){
         state.currentArticle.tags.splice(index, 1);
     },
     //修改文章----------直接修改新建文章,或者点击'编辑进来的文章'
     [types.ARTICLE_MODIFY](state, article){
         //这里需不需要待看
         state.currentArticle._id = article._id
         state.currentArticle.title = article.title;
         state.currentArticle.content = article.content;
         state.currentArticle.tags = article.tags; 
         //这里不能更改publish状态,点击进来的文章可能是已发布的文章


         //能根据index查找吗,而不用find

        // 修改文章同时也要修改allArticles这个数组
        let nowArticle = state.allArticles.find(o => o._id === article._id)
        if(nowArticle){
            nowArticle.title = article.title;
            nowArticle.content = article.content;
            nowArticle.tags = article.tags;
            nowArticle.lastEditTime = article.lastEditTime;
        }
     },
     //创建文章并保存,多types.ARTICLE_MODIFY一步就是unshift进allArticles
     [types.ARTICLE_CREATE](state, article){
         state.currentArticle._id = article._id
         state.currentArticle.title = article.title;
         state.currentArticle.content = article.content;
         state.currentArticle.tags = article.tags; 
         state.currentArticle.save = true;
         state.currentArticle.publish = false;
         //因为是创建文章，所有该文章排到了最前面的位置
         state.currentArticle.index = 0;
         state.allArticles.unshift(article);
     },
     //清空草稿：需要清空state.currentArticle所有状态
     [types.EMPTY_DRAFT](state){
        state.currentArticle.id = -1;
        state.currentArticle.content = '';
        state.currentArticle.title = '';
        state.currentArticle.tags = [];
        state.currentArticle.save = false;
     },
     //发布文章： 更改当前文章的publish状态
     [types.ARTICLE_PUBLISH](state){
     }
};
const actions = {
    //发布文章:需要更改当前全局publish状态
    publishArticle({ commit, state}){
        return new Promise((resolve, reject) => {
            A.ifPubArticles(state.currentArticle.id, true)
                .then(res => {
                    if(res.data.code === 200){
                        commit(types.ARTICLE_PUBLISH);
                        resolve(res.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    //保存文章,需要判断是点击“编辑”进来的文章，还是直接点击/admin/article这个路由来发布的新文章 
    saveArticle({ commit, state}, { title, content, abstract, tags }){
        //如果state.currentArticle.id=-1，说明是新的文章，调用创建文章的接口
        let id = state.currentArticle._id;
        let articleObject = { title, content, abstract, tags };
        if( id === -1){
            return new Promise((resolve, reject) => {
                A.createArticle(articleObject)
                    .then(res => {
                        if(res.data.code === 200){
                            let articleData = res.data.data;
                            commit(types.ARTICLE_CREATE, articleData);
                            resolve(articleData);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }else{ //如果state.currentArticle.id=-1，说明是旧的文章，调用修改文章的接口
            return new Promise((resolve, reject) => {
                A.modifyArticle(id, articleObject)
                    .then(res => {
                        console.log(res);
                        if(res.data.code === 200){
                            let articleData = res.data.data;
                            commit(types.ARTICLE_MODIFY, articleData);
                            resolve(articleData);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
    },
    //创建标签
     createTag({ commit }, tag){
         return new Promise((resolve, reject) => {
              T.createTag({ name: tag })
                .then( res => {
                    if(res.data.code === 200){
                        let tagData = res.data.data;
                        console.log(`创建${ tagData.name }标签成功!`);
                        //这里为什么需要先发请求去创建标签，而不是等文章写完统一发请求上去，主要是后台创建文章的接口，需要tag的id
                        commit(types.TAG_CREATE, tagData);
                        resolve(tagData);
                    }
                })
                .catch( err => {
                    reject(err);
                });
         });   
     },
     //删除标签
     deleteTag({ commit }, {id, index}){
         return new Promise((resolve, rejevt) => {
             T.deleteTag(id)
               .then(res => {
                   if(res.data.code === 200){
                       let data = res.data.data;
                       console.log(`删除${ id }标签成功!`);
                       commit(types.TAG_DELETE, index);
                       resolve(data);
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