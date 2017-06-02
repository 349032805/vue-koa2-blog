<template>
    <div class="article">
        <textarea name="" id="editor"></textarea>
    </div>
</template>

<script>
//引入富文本编译器和它的样式
import Simplemde from 'simplemde';
import marked from '../../assets/js/marked.js';
import 'assets/styles/vs.css'

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
            // console.log(simplemde.value());
        });
    }
}
</script>

<style lang="stylus">

@import '../../assets/stylus/markdown.styl';
@import '../../assets/stylus/preview.styl';
.CodeMirror, .CodeMirror-scroll {
	min-height: 500px;
}
</style>