import * as types from '../mutation_types.js';
import A from '../../axios/article.js';
import T from '../../axios/tag.js';

const state = {
    articleList: [], //存放当前 页 的5篇 文章的对象
    tagList: [],    //存放标签对象-----网站上的所有标签
    currentArticle: {
        id: -1,     //当前文章id
        content: '',    //内容
        title: '',      //标题
        tags: [],       //标签数组：只存放标签_id字符串，不是对象数组
        save: false,     //存储
        publish: false  //发布
    },
    allPage: 1,
    curPage: 1,
    selectTagArr: []           //当前所选的tag的所有id的数组
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
     //保存文章。
     [types.ARTICLE_SAVE](state, article){
         state.currentArticle.id = article['_id'];
         state.currentArticle.title = article.title;
         state.currentArticle.content = article.content;
         let tags = [];
         article.tags.forEach((val) => {
             tags.push(val._id);
         });
         state.currentArticle.tags = tags; 
         state.currentArticle.save = true;
         state.currentArticle.publish = false;
     },
     //清空草稿：需要清空state.currentArticle所有状态
     [types.EMPTY_DRAFT](state){
        state.currentArticle.id = -1;
        state.currentArticle.content = '';
        state.currentArticle.title = '';
        state.currentArticle.tags = [];
        state.currentArticle.save = false;
        state.currentArticle.publish = false;
     },
     //发布文章： 更改当前文章的publish状态
     [types.ARTICLE_PUBLISH](state){
         state.currentArticle.publish = true;
     },
     //不发布文章：
     [types.ARTICLE_NOT_PUBLISH](state){
         state.currentArticle.publish = false;
     }
};
const actions = {
    //发布文章
    publishArticle({ commit, state}){
        return new Promise((resolve, reject) => {
            A.ifPubArticles(state.currentArticle.id, true)
                .then(res => {
                    console.log(res);
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
        let id = state.currentArticle.id;
        let articleObject = { title, content, abstract, tags };
        if( id === -1){
            return new Promise((resolve, reject) => {
                A.createArticle(articleObject)
                    .then(res => {
                        let article = res.data.data;
                        if(res.data.code === 200){
                            commit(types.ARTICLE_SAVE, article);
                        }
                        resolve(res.data);
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
                        let article = res.data.data;
                        if(res.data.code === 200){
                            commit(types.ARTICLE_SAVE, article);
                        }
                        resolve(res.data);
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
                    let data = res.data.data;
                    let result = {};
                    result.id = data._id;
                    result.name = data.name;
                    console.log(`创建标签成功${ result.name }`);
                    commit(types.TAG_CREATE, result.id);
                    resolve(result);
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
                   let data = res.data.data;
                   if(res.data.code === 200){
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