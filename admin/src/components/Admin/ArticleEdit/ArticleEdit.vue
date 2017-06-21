<template>
    <div class="article-wrapper">
        <div class="article">
             <div class="title">
                <label for="title">文章标题: </label>
                <input type="text" id="title" v-model="articleTitle">
            </div>
            <div class="tag">
                <label for="tag">添加标签: </label>
                <input type="text" id="tag" placeholder="按回车添加标签" v-model="articleTag" @keyup.enter="addTag">
                <ul class="tags-wrapper">
                    <li class="has-tag" v-for="(item, index) in tagArr">
                        <span><i class="iconfont icon-tag i-tag"></i>{{ item.name }}</span>
                        <i class="iconfont icon-delete" @click.stop="deleteTag(item._id, index)"></i>
                    </li>
                </ul>
            </div>        
            <textarea id="editor"></textarea>
            <div class="btn">
                <div class="delete" @click.stop="emptyDraft">新建草稿</div>
                <div class="save" @click.stop="publishArticle">发布文章</div>
            </div>
        </div>
    </div>
</template>

<script>
//整个过程其实就是在围绕着this.$store.state.currentArticle这个状态对象来做的
//currentArticle.id === -1 说明当前没有文章
//
//当从“文章管理”点击"编辑"进来，那么得跳转到/admin/article并更改全局状态为点击“编辑”
//的文章的状态。这时候进入"admin/article"这个路由就不能再自动新建草稿了。此时要询问用户
//是否保存当前草稿，再进入要“编辑”的文章。
//
//引入富文本编译器
import Simplemde from 'simplemde';
import marked from 'assets/js/marked.js';
//引入辅助函数
import { mapState } from 'vuex';
//当前的全局变量
let simplemde;

export default {
    data(){
        return {
            articleTitle: '',
            articleTag: '',
            tagArr: [],
            articleContent: ''
        }
    },
    //这个组件只映射了state.article到computed。其他更改状态的mutations,actions,没有映射进来。主要是为了能
    //明显区别改方法就是再更改状态的
    computed: {
        ...mapState({
            currentArticle: state => state.article.currentArticle,
            allArticles: state => state.article.allArticles
        })
    },
    beforeRouteEnter(to, from, next){
        let index = to.query.index;
        if(to.path === "/admin/article" && from.path === "/admin/list" && index >= 0){
            //console.log('我是来编辑文章的！');
            next(vm => {
                let title = vm.allArticles[index].title;
                let content = vm.allArticles[index].content;
                let tags = vm.allArticles[index].tags.slice(0);
                vm.articleTitle = title;
                vm.articleContent = content;
                vm.tagArr = tags;
                simplemde.value(content);
                //还需把当前文章更改为当前“编辑”的文章
                vm.$store.commit('ARTICLE_MODIFY', {
                    article: vm.allArticles[index],
                    index
                });
            });
        }else{
            next(vm => {
                //slice(0)是避免赋值的是引用。
                //每次路由进来都得更新tagArr。
                vm.tagArr = vm.currentArticle.tags.slice(0);
            });
        }
    },
    mounted(){
        simplemde = new Simplemde({
            autoDownloadFontAwesome:false,
            spellChecker:false,
            element: document.getElementById('editor'),
            placeholder: "Press Ctrl+S to save the article...",
            previewRender: function(plainText) {
                return marked(plainText); // Returns HTML from a custom parser
            },
            tabSize: 4
        });
        //监听编辑器内容change事件
        simplemde.codemirror.on("change", () => {
            let value = simplemde.value();
            //如果没有改动，则什么都不做
            if(this.articleContent === value){
                return;
            }
            this.articleContent = value;
        });
        //按下ctrl+s就保存文章
        simplemde.codemirror.on('keydown', (cm, e) => {
            if( e.ctrlKey  == true && e.keyCode === 83 ){
                //保存文章并阻止浏览器保存页面的默认事件
                this.saveArticle();
                e.preventDefault();
	        }
        });
    },
    methods: {
        //清空草稿：清空状态
        emptyDraft(){
            //如果当前存在内容/标题/标签，但没有按Ctrl+S
            if(this.articleTitle !== '' && this.tagArr.length !== 0 && this.articleContent !== '' && this.currentArticle.save === false){
                this.$message({
                    type: 'warning',
                    message: '当前文章还未保存！'
                });
                return ;
            }
            this.$confirm('此操作将替换当前文章,是否继续?', '提示')
                .then(() => {
                    this.articleTitle = '';
                    this.articleTag = '';
                    this.articleContent = '';
                    this.tagArr = [];
                    this.$store.commit('EMPTY_DRAFT');
                    simplemde.value('');
                    this.$message({
                        type: 'success',
                        message: '新建草稿成功!'
                    });
                })
                .catch(() => {});
        },
        //发布文章:需满足信息已完善并且已经保存
        publishArticle(){
            if(this.articleContent === '' || this.tagArr.length === 0 || this.articleTitle === ''){
                this.$message({
                    type: 'success',
                    message: '请先完善文章!'
                });
                return;
            }
            //判断全局save状态
            if(this.currentArticle.save === false){
                this.$message({
                    type: 'warning',
                    message: '文章还未保存!'
                });
                return ;
            }
            //判断全局publish状态
            if(this.currentArticle.publish === true){
                this.$message({
                    type: 'success',
                    message: '文章早已经发布,无需再发布啦!'
                });
                return ;
            }
            this.$confirm('此操作将发布文章,是否继续?', '提示')
                .then(res => {
                    this.$store.dispatch('publishArticle', { id: this.currentArticle._id })
                        .then(res => {
                            if(res){
                                this.$message({
                                    type: 'success',
                                    message: '发布文章成功!'
                                });
                            }
                        })
                        .catch(err => {
                            console.log('发布文章失败!');
                            this.$message({
                                type: 'error',
                                message: '发布文章失败!'
                            });
                        });
                })
                .catch(() => {});
            
        },
        //保存文章-----标签/内容/摘要不能为空才能保存
        saveArticle(){
            let title = this.articleTitle;
            let content = this.articleContent;
            let tags = this.tagArr.map((obj) => {
                return obj._id;
            });
            if(title === ''){
                this.$message({
                    type: 'warning',
                    message: '标题不能为空!'
                });
                return;
            }
            if(tags.length === 0){
                this.$message({
                    type: 'warning',
                    message: '标签不能为空!'
                });
                return;
            }
            if(content === ''){
                this.$message({
                    type: 'warning',
                    message: '内容不能为空!'
                });
                return;
            }
            let abstract;
            if(content.indexOf('<!--more-->') !== -1 && content.split('<!--more-->')[0] !== ''){
                abstract = content.split('<!--more-->')[0];
            }else{
                this.$message({
                    type: 'warning',
                    message: '摘要不能为空!'
                });
                return;
            }
            //构造好要保存的数组
            let article = {
                title,
                content,
                abstract,
                tags
            };
            this.$store.dispatch('saveArticle', article)
                .then(res => {
                    if(res){
                        this.$message({
                            type: 'success',
                            message: '保存文章成功!'
                        });
                    }
                })
                .catch(err => {
                    console.log('保存文章错误！');
                    this.$message({
                        type: 'error',
                        message: '保存文章错误!'
                    });
                });
        },
        //按enter添加标签(不能超过5个，不能重复)-----这里应该不用发请求去创建标签，等保存文章的时候统一发送比较好
        addTag(){
            if(this.tagArr.findIndex(v => v.name === this.articleTag ) > -1){
                this.$message({
                    type: 'warning',
                    message: '标签不能重复!'
                });
                return ;
            }
            if(this.tagArr.length >= 5){
                this.$message({
                    type: 'warning',
                    message: '不能创建超过5个标签!'
                });
                return;
            }
             this.$store.dispatch('createTag', this.articleTag)
                .then(res => { //res为{id: 'XXX', name: 'xxx'}
                    if(res){
                        this.tagArr.push(res);
                        this.articleTag = '';
                        this.$message({
                            type: 'success',
                            message: '标签创建成功!'
                        });
                    }
                })
                .catch(err => {
                    console.log('创建标签错误！');
                    this.$message({
                        type: 'error',
                        message: '标签创建失败!'
                    });
                }); 
        },
        //删除标签：需要切掉tagArr数组的某一个
        deleteTag(id, index){
            this.$confirm('此操作将永久删除该标签,是否继续?', '提示')
                .then(() => {
                    this.$store.dispatch('deleteTag', id)
                        .then(res => {
                            if(res){
                                this.tagArr.splice(index, 1);
                                this.$message({
                                    type: 'success',
                                    message: '该标签删除成功！'
                                });
                            }
                        })
                        .catch(err => {
                            console.log('删除标签失败！');
                            this.$message({
                                type: 'error',
                                message: '删除失败！'
                            });
                        });
                })
                .catch(() => {});
        },
    }
}
</script>

<style lang="stylus">
//必须引为全局样式
// 引入markdown编译器的样式
// 引入双屏时预览时右屏的样式
// 引入只针对code代码的样式

@import '../../../assets/stylus/markdown.styl';
@import '../../../assets/stylus/preview.styl';
@import '../../../assets/stylus/code.styl';

.CodeMirror-fullscreen
        background-color: #fff
.CodeMirror, .CodeMirror-scroll
	    min-height: 400px
</style>

<style lang="stylus" scoped>
@import '../../../assets/stylus/_setting.styl';
.article-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .article
        position: relative
        padding: 20px
        .title, .tag
            input 
                height: 25px
                width: 300px
                padding-left: 8px
                margin-bottom: 20px
                border: none
                border-bottom: 1px solid $green
                outline: none
                font-size: 18px
        .tag
            position: relative
            .tags-wrapper
                position: absolute
                left: 391px
                top: 1px
                white-space: nowrap
                overflow: hidden
                font-size: 0
                .has-tag
                    position: relative
                    display: inline-block
                    height: 30px
                    line-height: 30px
                    font-size: 14px
                    margin-right: 20px
                    cursor: pointer
                    .i-tag
                        font-size: 14px
                        padding-right: 5px
                    &:hover
                        &>i 
                            display: block
                    &>i 
                        position: absolute
                        top: -10px
                        right: -14px
                        display: none
                        color: $green
        .btn
            position: absolute
            top: 20px
            right: 20px
            cursor: pointer
            .delete, .save
                display: inline-block
                font-size: 16px
                width: 80px
                height: 30px
                margin-right: 10px
                line-height: 30px
                text-align: center
                border: 1px solid #00
                border-radius: 5px
            .save
                background-color: $green
                color: #fff
                border: 1px solid $green
</style>