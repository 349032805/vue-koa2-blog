<template>
    <div class="article-wrapper">
        <div class="article">
            <div class="title">
                <span>文章标题: </span>
                <input type="text">
            </div>
            <div class="tag">
                <span>添加标签: </span>
                <input type="text">
            </div>
            <div class="has">已有标签：</div>
            <textarea name="" id="editor"></textarea>
            <div class="btn">
                <div class="delete">删除草稿</div>
                <div class="save">发布文章</div>
            </div>
        </div>
    </div>
</template>

<script>
//引入富文本编译器
import Simplemde from 'simplemde';
import marked from 'assets/js/marked.js';


export default {
    mounted(){
        let simplemde = new Simplemde({
            element: document.getElementById('editor'),
            placeholder: "Type here...",
            previewRender: function(plainText) {
                console.log(plainText);
                return marked(plainText); // Returns HTML from a custom parser
            }
        });
        simplemde.codemirror.on("change", function(){
            console.log(simplemde.value());
        });
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
	    min-height: 500px
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
        font-size: 20px
        .title
            input 
                height: 30px
                width: 300px
                margin-bottom: 20px
        .tag
            input 
                height: 30px
                width: 300px
                margin-bottom: 20px
        .has
            margin-bottom: 20px
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