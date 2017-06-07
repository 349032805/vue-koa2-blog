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
                        <i class="iconfont icon-delete" @click.stop="deleteTag(item.id, index)"></i>
                    </li>
                </ul>
            </div>        
            <textarea id="editor"></textarea>
            <div class="btn">
                <div class="delete">删除草稿</div>
                <div class="delete">新建草稿</div>
                <div class="delete" @click.stop="deleteArticle">取消发布</div>
                <div class="save" @click.stop="saveArticle">发布文章</div>
            </div>
        </div>
    </div>
</template>

<script>
//整个流程就是一进入/admin/article就自动新建好了草稿,把状态存到store
//把currentArticle的id改为当前草稿的id, id!=-1说明当前存在文章草稿
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

export default {
    data(){
        return {
            articleTitle: '',
            articleTag: '',
            tagArr: [],
            articleContent: ''
        }
    },
    computed: {
        ...mapState({
            currentArticle: state => state.article.currentArticle
        })
    },
    mounted(){
        let simplemde = new Simplemde({
            element: document.getElementById('editor'),
            placeholder: "Type here...",
            previewRender: function(plainText) {
                return marked(plainText); // Returns HTML from a custom parser
            }
        });
        simplemde.codemirror.on("change", function(){
            console.log(simplemde.value());
            let value = simplemde.value();
            //如果没有改动，则什么都不做
            // if(this.articleContent === value){
            //     return;
            // }else{
            //     this.saveArticle();
            // }

            this.articleContent = value; 
        });
    },
    methods: {
        //发布文章
        publishArticle(){

        },
        //删除草稿
        deleteArticle(){

        },
        //保存文章
        saveArticle(){
            console.log(this.currentArticle);
        },
        //按enter添加标签(不能超过5个，不能重复)
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
                    this.tagArr.push(res);
                    this.articleTag = '';
                    this.$message({
                        type: 'success',
                        message: '标签创建成功!'
                    });
                })
                .catch(err => {
                    console.log(err);
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
                    this.$store.dispatch('deleteTag', {id, index})
                        .then(res => {
                            if(res){
                                //切除掉
                                this.tagArr.splice(index, 1);
                                this.$message({
                                    type: 'success',
                                    message: '该标签删除成功！'
                                });
                            }
                        })
                        .catch(err => {
                            this.$message({
                                type: 'error',
                                message: '删除失败！'
                            });
                        });
                })
                .catch(() => {

                });
        }
    }
}
</script>

<style lang="stylus">
//必须引为全局样式
// 引入markdown编译器的样式
// 引入双屏时预览时右屏的样式
// 引入只针对code代码的样式

@import '../../assets/stylus/markdown.styl';
@import '../../assets/stylus/preview.styl';
@import '../../assets/stylus/code.styl';

.CodeMirror-fullscreen
        background-color: #F9F9F5
.CodeMirror, .CodeMirror-scroll
	    min-height: 400px
</style>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
.article-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflowx-x: hidden
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