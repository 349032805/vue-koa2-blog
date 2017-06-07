import * as types from '../mutation_types.js';
import A from '../../axios/article.js';
import T from '../../axios/tag.js';

const state = {
    articleList: [], //存放当前 页 的5篇 文章的对象
    tagList: [],    //存放标签对象-----网站上的所有标签
    currentArticle: {
        id: -1,     //当前文章id 
        index: -1,      //index为当前文章数组中的第index个
        content: '',    //内容
        title: '',      //标题
        tags: [],       //标签
        save: true,     //存储
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
     }
};
const actions = {
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

// const mutations = {
//     //article应该是一个对象
//     [types.ARTICLE_CREATE](state, article){
//         state.articleList.unshift(article);
//         state.currentArticle = article;
//     },
//     //传入一个id表示当前要保存的文章的id
//     [types.ARTICLE_SAVE](state, { id, article }){
//         state.currentArticle.save = true;//当前文章保存
//         //找出articleList数组里面符合条件的文章
//         let now = state.articleList.find(p => p.id === id)
//             if (now) {
//             now.title = article.title;
//             now.content = article.content;
//             now.abstract = article.abstract;
//             now.tags = article.tags;
//             now.lastEditTime = article.lastEditTime;
//         }
//     },
//     //发布文章，只需将当前文章publish改为true
//     [types.ARTICLE_PUBLISH](state){
//         state.currentArticle.publish = true;
//     },
//     //获取所有文章，传入当前分页的所有文章，页数，总页数
//     [types.ARTICLE_GET_ALL](state, { articleList, allPage, curPage}){
//         state.articleList = articleList;
//         state.allPage = allPage;
//         state.curPage = curPage;
//     },
//     //获取当前文章
//     [types.ARTICLE_GET_CURRENT](state, article){
//         state.currentArticle = article;
//     },
//     //改变当前文章为不保存
//     [types.ARTICLE_CHANGE](state){
//         state.currentArticle.save = false;
//     },
//     //发布文章，同时文章数组里面对应的文章也要改
//     [types.ARTICLE_PUBLISH](state, id){
//         state.currentArticle.publish = true;
//         state.article.find(p => p.id === id).publish = true;
//     },
//     //不发布文章，同时文章数组里面对应的文章也要改
//     [types.ARTICLE_NOT_PUBLISH](state, id){
//         state.currentArticle.publish = false;
//         state.articleList.find(p => p.id === id).publish = true;
//     },
//     //删除文章，同时文章数组里面对应的文章也要删除
//     [types.ARTICLE_DELETE](state, index){
//         //删除
//         state.articleList.splice(index, 1);
//         //如果删除的是最后一个，那么这个index就不能用了
//         if(index > state.article.length - 1){
//             index = state.article.length - 1;
//         }
//         //数组里面的article对象是没有index和publish属性的
//         state.currentArticle = state.articleList[index];
//         state.currentArticle.index = index;
//         state.currentArticle.save = true;
//     },
//     //创建标签，存入当前文章
//     [types.CREATE_TAG](state, tag) {
//         state.currentArticle.tags.push(tag)
//     },
//     //修改标签-----应该有误
//     [types.MODIFY_TAG](state, name) {
//         state.currentArticle.tags.push(name)
//     },
//     //删除标签，三个地方都给删除
//     [types.DELETE_TAG](state, id) {
//         state.tagList = state.tagList.filter((e) => {
//         return e.id !== id;
//         })
//         state.currentArticle.tags = state.currentArticle.tags.filter((e) => {
//         return e.id !== id;
//         })
//         state.selectTagArr = state.selectTagArr.filter((e) => {
//         return e !== id;
//         })
//     },
    //------------------------------------------------
    // //删除当前文章的某个标签
    // [types.DELETE_CURRENT_TAG](state, index) {
    //     state.currentArticle.tags.splice(index, 1)
    // },
    // //获取所有标签
    // [types.GET_ALL_TAGS](state, tagList) {
    //     state.tagList = tagList;
    // },
    // //设置总页数
    // [types.SET_ALL_PAGE](state, allPage) {
    //     state.allPage = allPage;
    // },
    // //设置当前页数
    // [types.SET_CUR_PAGE](state, curPage) {
    //     state.curPage = curPage;
    // },
    // //切换当前所选文章的tag
    // [types.TOGGLE_SELECT_TAG](state, id) {
    //     if (!state.selectTagArr.includes(id)) {
    //     state.selectTagArr.push(id);
    //     } else {
    //     state.selectTagArr = state.selectTagArr.filter((e) => {
    //         return e !== id;
    //     })
    //     }
    // },
    // //清空当前所选的tag的id数组
    // [types.CLEAR_SELECT_TAG](state) {
    //     state.selectTagArr = [];
    // }
    //-----------------------------types有误
// };

export default {
    state,
    mutations,
    actions
}