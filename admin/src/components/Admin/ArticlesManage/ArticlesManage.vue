<template>
    <div class="article-list-wrapper">
        <div class="article-list">
            <v-list :colums="colums" :data="articleList" @publish="publishArticle" @notPublish="notPublishArticle"
            @delete="deleteArticle" @editor="editorArticle"></v-list>
            <v-loading v-show="loading"></v-loading>          
        </div>
    </div>
</template>

<script>
import ArticleList from './ArticleList/ArticleList';
import A from '../../../axios/article.js';
import Loading from 'components/common/Loading/Loading';
import { mapState } from 'vuex';

export default {
    data(){
        return {
            colums: ['文章标题', '摘要', '最后修改时间', '状态'],
            articleData: [],
            loading: true
        }
    },
    computed: {
        ...mapState({
            allArticles: state => state.article.allArticles
        }),
        articleList(){
            return this.allArticles.map((val) => {
                       let obj = {};
                       obj.title = val.title;
                       obj.abstract = val.abstract;
                       obj.lastEditTime = val.lastEditTime;
                       obj.publish = val.publish;
                       return obj;
                   });
        }
    },
    created(){
         this.$store.dispatch('getAllArticles')
             .then(res => {
                this.loading = false;
             })
             .catch(err => {
                 console.log('获取所有文章失败!');
                 this.$message({
                     type: 'error',
                     message: '获取所有文章失败!'
                 });
             });
    },
    methods: {
        //编辑文章:只需进入/admin/article，无需发请求
        editorArticle(index){
            this.$router.replace({ path: '/admin/article', query: { index }})
        },
        //拿到index既可以帮我们拿到文章的id,也能帮我们判断操作的是历史文章还是当前文章
        publishArticle(index){
            let id = this.allArticles[index]._id;
            this.$store.dispatch('publishArticle', { id, index })
                .then(res => {
                    if(res){
                        this.$message({
                            type: 'success',
                            message: '发布文章成功!'
                        });
                    }
                })
                .catch(err => {
                    console.log('发布文章失败！');
                    this.$message({
                        type: 'error',
                        message: '发布文章失败!'
                    });
                });
        },
        //取消发布
        notPublishArticle(index){
            let id = this.allArticles[index]._id;
            this.$store.dispatch('notPublishArticle', { id, index })
                .then(res => {
                    if(res){
                        this.$message({
                            type: 'success',
                            message: '取消发布成功!'
                        });
                    }
                })
                .catch(err => {
                    console.log('取消发布失败！');
                    this.$message({
                        type: 'error',
                        message: '取消发布失败!'
                    });
                });
        },
        //删除文章
        deleteArticle(index){
            let id = this.allArticles[index]._id;
            this.$store.dispatch('deleteArticle', { id, index })
                .then(res => {
                    if(res){
                        this.$message({
                            type: 'success',
                            message: '删除文章成功!'
                        });
                    }
                })
                .catch(err => {
                    console.log('删除文章失败！');
                    this.$message({
                        type: 'error',
                        message: '删除文章失败!'
                    });
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
    overflow-y: auto
    .article-list
        box-sizing: border-box
        width: calc(100% - 20px)
        padding: 10px
</style>