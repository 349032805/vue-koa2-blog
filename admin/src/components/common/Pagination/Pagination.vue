<template>
    <div class="pagination-wrapper" >
        <div class="prePage" @click="preEvent" v-show="prePage">上一页</div>
        <ul>
            <li v-for="(item, index) in loopPage" @click="changeOffset(item, loopPage[index - 1])" 
            :class="{ active:item===currentPage, hover:item!==currentPage&&item!==0 }"> 
            <!-- 注意这里传入的是item而不是索引index,loopPage[index - 1]为点击省略号的时候使用 -->
                <a v-if="item">{{ item }}</a>
                <a v-else>...</a>
            </li>
        </ul>
        <div class="nextPage" @click="nextEvent" v-show="nextPage">下一页</div>
    </div>
</template>

<script>
//整个组件围绕着offset这个变量来变化
export default {
    data(){
        return {
            offset: 0 //初始时 偏移量为0。偏移量offset---即到当前页总共有几条数据。假设现在在第5页，每页5条数据，那么offset = 20
        }
    },
    props: {
        total: {              //总数据数
            type: Number,
            required: true,
            default: 30
        },
        limit: {
            type: Number,
            required: true,
            limit: 5
        }
    },
    computed: {
        //总页数
        totalPage(){
            return Math.ceil(this.total / this.limit);
        }, 
        //当前页，父组件要用到
        currentPage(){
            let result = (this.offset / this.limit) + 1
            //默认一开始就在第一页
            this.$emit('newPage', result);
            return result;
        },
        //上一页变量
        prePage(){
            return this.offset !== 0;
        },
        //下一页变量
        nextPage(){
            return (this.offset + this.limit) < this.total;
        },
        //循环li时所需要用到的数组
        loopPage(){
            let total = this.totalPage, //获取总页数
                index = this.currentPage;   //获取当前页
            //当总页数<5时，显示所有页
            if(total <= 5){
                return [1, 2, 3, 4, 5];
            }
            //当总页数>5时
            //当前页距离首页小于2，显示前三页页码和省略号，0代表省略号
            if(index <= 2){
                return [1, 2, 3, 0, total];
            }
            //当前页距离尾页<2,显示后三页和省略号
            if(index >= total -1){
                return [1, 0, total - 2, total - 1, total];
            }
            //当前页=2，显示前四页和省略号
            if(index === 2 || index === 3){
                return [1, 2, 3, 4, 0, total];
            }
            //当前页=total-2,显示后四页和省略号
            if(index === total - 2 || index === total - 3){
                return [1, 0, total - 3, total - 2, total - 1, total];
            }
            //当前页码距首页大于3且距尾页大于3时，显示当前页码和当前页码的前一页和后一页，两边各有一个省略号
            return [1, 0, index - 1, index, index + 1, 0, total]
        }
    },
    methods: {
        changeOffset(item, last){
            //当点击省略号时
            if(item === 0){
                this.offset = (last - 1) * this.limit;
                return;
            }
            if(item === this.currentPage){
                return;
            }
            this.offset = (item - 1) * this.limit;
        },
        //点击"上一页"
        preEvent(){
            this.offset -= this.limit;
        },
        //点击"下一页"
        nextEvent(){
            this.offset += this.limit;
        }
    }
}  
</script>

<style lang="stylus" scoped>
.pagination-wrapper
    text-align: center
    .prePage, .nextPage
        display: inline-block
        cursor: pointer
        color: #009688
        user-select: none
        &:hover
            color: #7ba6b3
    ul 
        display: inline-block
        font-size: 0
        list-style: none
        li
            display: inline-block
            font-size: 16px
            padding: 1px 10px
            margin: 0 5px
            color: #009688
            border: 1px solid transparent
            border-radius: 50%
            cursor: pointer
            user-select: none
    .active
        border-color: #009688
    .hover
        &:hover
            border-color: #009688
</style>