<template>
    <div class="tags-wrapper">
        <div class="tags">
           
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            tags: ['标签1', '标签2', '标签3', '标签4', '标签5','标签6', '标签7', '标签8', '标签9', '标签10','标签11', '标签12', '标签13', '标签14', '标签15','标签16', '标签21', '标签23']
        }
    },
    created(){

    },
    mounted(){
    }
}
</script>


<style lang="stylus" scoped>

.tags-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .tags
        padding: 20px
</style>