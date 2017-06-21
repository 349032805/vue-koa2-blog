import * as types from '../mutation_types.js';
import A from '../../axios/article.js';
import T from '../../axios/tag.js';

const state = {
    currentArticle: {
        _id: -1,     //当前文章id
        index: -1,   //当前文章在文章数组中的位置
        abstract: '', //摘要
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
     //用户登出
     [types.RESET](state){
         state.currentArticle._id = -1;
         state.currentArticle.index = -1;
         state.currentArticle.abstract = '';
         state.currentArticle.content = '';
         state.currentArticle.title = '';
         state.currentArticle.tags = [];
         state.currentArticle.publish = false;
         state.currentArticle.save = false;
         state.allArticles = [];
         state.allTags = [];
     },
     //创建标签，并push进currentArticle.tags里面
     [types.TAG_CREATE](state, tag){
         state.currentArticle.tags.push(tag);
         if(!state.allTags.some(o => o._id === tag._id)){
            state.allTags.push(tag);
         }
     },
     //删除标签,index是要删除tag在currentArticle.tags里面的索引-----缺
     [types.TAG_DELETE](state, id){
         let inCurArticleTagsIndex = state.currentArticle.tags.findIndex(o => o._id === id);
         if(inCurArticleTagsIndex >= 0){
            state.currentArticle.tags.splice(inCurArticleTagsIndex, 1);
         }      
         let inAllTagsIndex = state.allTags.findIndex(o => o._id === id);
         if(inAllTagsIndex >= 0){
            state.allTags.splice(inAllTagsIndex, 1);
         }
         //那需要检查所有跟该tag有关联的文章
        state.allArticles.forEach(article => {
            let index = article.tags.findIndex(o => o._id === id);
            if(index >= 0){
                article.tags.splice(index, 1);
            }
        });
         //如果当前currentArticle.id != -1,说明是存在文章的
         //而state.allArticles[state.currentArticle].tags和state.currentArticle.tags
         //是指向同一引用的。所以删state.currentArticle.tags即可
     },
     //修改文章----------直接修改新建文章,或者点击'编辑进来的文章'
     [types.ARTICLE_MODIFY](state, { article, index }){
         state.currentArticle._id = article._id
         state.currentArticle.title = article.title;
         state.currentArticle.abstract = article.abstract;
         state.currentArticle.content = article.content;
         state.currentArticle.tags = article.tags; 
         //点击进来的文章可能是已发布的文章
         state.currentArticle.publish = article.publish;
         state.currentArticle.save = true;
         if(index >= 0){
             state.currentArticle.index = index;
         }

        let nowArticle = state.allArticles[state.currentArticle.index];
        nowArticle.title = article.title;
        nowArticle.abstract = article.abstract;
        nowArticle.content = article.content;
        nowArticle.tags = article.tags;
        nowArticle.lastEditTime = article.lastEditTime;
     },
     //创建文章并保存,多types.ARTICLE_MODIFY一步就是unshift进allArticles
     [types.ARTICLE_CREATE](state, article){
         state.currentArticle._id = article._id
         state.currentArticle.title = article.title;
         state.currentArticle.abstract = article.abstract;
         state.currentArticle.content = article.content;
         //注意这里传递的是引用。那么allArticles[0].tags 和 state.currentArticle.tags其实是一样的
         state.currentArticle.tags = article.tags; 
         state.currentArticle.save = true;
         state.currentArticle.publish = false;
         //因为是创建文章，所有该文章排到了最前面的位置
         state.currentArticle.index = 0;
         state.allArticles.unshift(article);
     },
     //清空草稿：需要清空state.currentArticle所有状态
     [types.EMPTY_DRAFT](state){
        state.currentArticle._id = -1;
        state.currentArticle.index = -1;
        state.currentArticle.abstract = '';
        state.currentArticle.content = '';
        state.currentArticle.title = '';
        state.currentArticle.tags = [];
        state.currentArticle.publish = false;
        state.currentArticle.save = false;
     },
     //发布文章： 更改当前文章的publish状态
     [types.ARTICLE_PUBLISH](state, index){
        if(index === undefined || index === state.currentArticle.index){//说明发布的是当前文章
            console.log('更改的是当前在写的文章');
            state.currentArticle.publish = true;
            state.allArticles[state.currentArticle.index].publish = true;
        }else{//说明是选择某篇文章去发布的,那么只需要更改数组，无需更改currentArticle.publish
            console.log('是选择某篇文章去发布的');
            state.allArticles[index].publish = true;
        }
     },
     //获取所有文章，需要存进allArticles
     [types.ARTICLE_GET_ALL](state, articles){
        //这里不用连接数组,这个types.ARTICLE_GET_ALL事件，其实只用触发一次
        state.allArticles = articles;
     },
     //取消发布
     [types.ARTICLE_NOT_PUBLISH](state, index){
        if(index === state.currentArticle.index){
            state.currentArticle.publish = false;
            state.allArticles[state.currentArticle.index].publish = false;
        }else{
            state.allArticles[index].publish = false;
        }
     },
     //删除文章：注意下如果清空的刚好是当前文章，需清空state.currentArticle
     [types.ARTICLE_DELETE](state, index){
        if(index === state.currentArticle.index){
            state.currentArticle._id = -1;
            state.currentArticle.index = -1;
            state.currentArticle.abstract = '';
            state.currentArticle.content = '';
            state.currentArticle.title = '';
            state.currentArticle.tags = [];
            state.currentArticle.publish = false;
            state.currentArticle.save = false;
            state.allArticles.splice(index, 1)
        }else{
            state.allArticles.splice(index, 1)
        }
     },
     //查询所有标签:需要存入allTags
     [types.TAG_GET_ALL](state, tags){
        state.allTags = tags;
     },
     //修改某个标签同时还需同currentArtile和allArticles里面的标签的修改----缺
     [types.TAG_MODIFY](state, { tag, id }){
        //如果存在当前文章，则需检查它的tags数组有没有我们修改的tag
        if(state.currentArticle._id !== -1){
            let currentTag = state.currentArticle.tags.find(o => o._id === id);
            currentTag.name = tag.name;
        }
        //那需要检查所有跟该tag有关联的文章
        state.allArticles.forEach(article => {
            let inTag = article.tags.find(o => o._id === id);
            inTag.name = tag.name;
        });
        let nowTag = state.allTags.find(o => o._id === id);
        nowTag.name = tag.name;
     }
};
const actions = {
    //修改某个标签
    modifyTag({ commit }, { val, id}){
        return new Promise((resolve, reject) => {
            T.modifyTag(id, { name: val })
                .then(res => {
                    if(res.data.code === 200){
                        let tag = res.data.data;
                        commit(types.TAG_MODIFY, { tag, id });
                        resolve(tag);
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    //获得所有标签
    getAllTags({ commit }){
        return new Promise((resolve, reject) => {
            T.getAllTags()
                .then(res => {
                    if(res.data.code === 200){
                        let tags = res.data.data;
                        commit(types.TAG_GET_ALL, tags);
                        resolve(tags);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    //删除文章:如果刚好删除的是当前文章，那么得清空state.currentArtile
    deleteArticle({ commit }, { id, index }){
        return new Promise((resolve, reject) => {
            A.deleteArticleById(id)
                .then(res => {
                    if(res.data.code === 200){
                        commit(types.ARTICLE_DELETE, index);
                        resolve(res.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    //取消发布
    notPublishArticle({ commit }, {id, index}){
        return new Promise((resolve, reject) => {
            A.ifPubArticles(id, false)
                .then(res => {
                    if(res.data.code === 200){
                        commit(types.ARTICLE_NOT_PUBLISH, index);
                        resolve(res.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    //获取所有文章(包括发布和未发布的)
    getAllArticles({ commit }){
        return new Promise((resolve, reject) => {
            A.getAllArticles()
                .then(res => {
                    if(res.data.code === 200){
                        let data = res.data.data;
                        commit(types.ARTICLE_GET_ALL, data);
                        resolve(data);
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    //发布文章:需要已经保存好的文章。
    //index为要发布的文章在allArticles里面的位置
    //index 有值说明是点击“发布”按钮进来的
    publishArticle({ commit, state}, {id, index}){
        return new Promise((resolve, reject) => {
            A.ifPubArticles(id, true)
                .then(res => {
                    if(res.data.code === 200){
                        commit(types.ARTICLE_PUBLISH, index);
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
                        if(res.data.code === 200){
                            let articleData = res.data.data;
                            commit(types.ARTICLE_MODIFY, { article: articleData });
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
     deleteTag({ commit }, id){
         return new Promise((resolve, reject) => {
             T.deleteTag(id)
               .then(res => {
                   if(res.data.code === 200){
                       let data = res.data.data;
                       commit(types.TAG_DELETE, id);
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