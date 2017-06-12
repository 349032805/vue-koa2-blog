<template>
    <div class="tag">
        <div class="tag-modify">
            <i class="iconfont icon-write" @click="writeTag"></i>
        </div>
        <div class="tag-content">
            <input type="text" class="tag-input" :value="tagName" @keyup.enter="changeValue($event.target.value)" ref="tagInput" @blur="blurEvent">
        </div>
        <div class="tag-delete">
            <i class="iconfont icon-delete2" @click="deleteTag"></i>
        </div>
    </div>
</template>

<script>
export default {
    //没有利用双向数据绑定只是想让旧值一直存在
    data(){
        return {
            enter: false //避免调用changeValue方法时点击按钮会触发blurEvent
        }
    },
    props: {
        tagName: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        //当改变值的时候，才触发
        changeValue(val){
            this.enter = true;
            if(val === this.tagName){
                return;
            }
            if(val === ''){
                this.$message({
                    type: 'warning',
                    message: '标签内容不能为空!'
                });
                this.enter = false;
                return;
            }
            this.$confirm('此操作将修改该标签,是否继续?', '提示')
                .then(() => {
                    this.$refs['tagInput'].value = val;
                    this.$emit('changeValue', { val, index: this.index });
                    this.enter = false;
                })
                .catch(() => {
                    this.$refs['tagInput'].value = this.tagName;
                    this.enter = false;
                });
        },
        deleteTag(){
            this.$confirm('此操作将永久删除改标签,是否继续?', '提示')
                .then(() => {
                    this.$emit('deleteTag', this.index);
                })
                .catch(() => {});
        },
        writeTag(){
            this.$refs['tagInput'].focus();
        },
        blurEvent(){
            if(this.enter === false){
                this.$refs['tagInput'].value = this.tagName;
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../../../assets/stylus/_setting';

.tag
    position: relative
    display: inline-block
    width: 170px
    margin: 5px
    height: 50px
    padding: 5px 20px 5px 8px
    box-shadow:1px 1px 2px #7D7D7D
    .tag-modify
        float: left
        line-height: 50px
        vertical-align: middle
        i.icon-write
            font-size: 16px
            font-weight: 700 
            cursor: pointer
    .tag-content
        margin-left: 30px
        line-height: 50px
        .tag-input
            border: none
            outline: none
            width: 155px
    .tag-delete
        position: absolute
        right: 5px
        top: 0
        cursor: pointer
        i.icon-delete2
            font-weight: 700
            color: $green

</style>