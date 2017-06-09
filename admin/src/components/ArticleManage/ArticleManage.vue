<template>
    <div class="article-list-wrapper">
        <div class="article-list">
            <v-list :colums="colums" :data="articleList"></v-list>
            <v-loading v-show="loading"></v-loading>
        </div>
    </div>
</template>

<script>
import ArticleList from 'components/ArticleList/ArticleList';
import A from '../../axios/article.js';
import Loading from 'components/Loading/Loading';

export default {
    data(){
        return {
            articleList: [],
            colums: ['文章标题', '摘要', '最后修改时间', '状态'],
            articleData: [],
            loading: true
        }
    },
    watch: {
        refresh(val){
            console.log('有文章创建了！我要重新拉取数据');
            this.getArticleListData();
        }
    },
    computed: {
    },
    created(){
    },
    activated(){
        this.getArticleListData();
    },
    methods: {
        //获取文章列表的数据
        getArticleListData(){
            A.getAllArticles()
            .then(res => {
                if(res.data.code === 200){
                   let data = res.data.data;
                   this.articleData = data;
                   this.articleList = data.map((val) => {
                       let obj = {};
                       obj.title = val.title;
                       obj.abstract = val.abstract;
                       obj.lastEditTime = val.lastEditTime;
                       obj.publish = val.publish;
                       return obj;
                   });
                   this.loading = false;
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    components: {
        'v-list': ArticleList,
        'v-loading': Loading
    }
}
</script>

<style lang="stylus" scoped>
.article-list-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .article-list
        padding: 20px 20px 20px 20px
</style>