<template>
    <div class="tags-wrapper">
        <div class="tags">
            <div id="tagsCloud"></div>
        </div>
    </div>
</template>

<script>
import TagCloud from 'assets/js/tagCloud.js';

export default {
    data(){
        return {
            tags: ['标签1', '标签2', '标签3', '标签4', '标签5','标签6', '标签7', '标签8', '标签9', '标签10','标签11', '标签12', '标签13', '标签14', '标签15','标签16', '标签21', '标签23']
        }
    },
    mounted(){
        var oDiv = document.getElementById('tagsCloud');

        var obj = new TagCloud(oDiv, {
                    tags: this.tags,
                    radius:100,
                    maxFont:30,
                    color:true,
                    rotateAngleXbase:800,
                    rotateAngleYbase:800,
                    hover: false
        });
        obj.on('close', function(data){
            console.log(data);
        });
    }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/tagCloud'
</style>

<style lang="stylus" scoped>
#tagsCloud
    width: 500px
    height: 1000px
    margin: 0 auto
.tags-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .tags
        padding: 20px
</style>