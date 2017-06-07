<template>
    <transition name="fade">
        <div class="confirm" v-show="visible">
            <div class="confirm-header">
                <span class="confirm-title">{{ title }}</span>
                <div class="confirm-close" @click.stop="closeEvent">X</div>
            </div>
            <div class="confirm-body">
                <div class="confirm-img">
                    <img src="../assets/warn.svg" alt="warn" width="30px">
                </div>
                <span class="confirm-content">{{ content }}</span>
            </div>
            <div class="confirm-footer">
                <button @click.stop="cancelEvent">{{ cancelButtonText }}</button>
                <button @click.stop="confirmEvent">{{ confirmButtonText }}</button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {
            title: '提示',
            content: '此操作将永久删除该文件, 是否继续?',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            visible: false, //是否显示
            onClose: null, //关闭后的回调
            resolve: null,    //这两个变量用来存放resolve,rejcet函数，点击的时候调用
            reject: null
        }
    },
    watch: {
        visible(newVal){
            if(newVal === false){
                this.$el.addEventListener('transitionend', this.destoryElement);
            }
        }
    },
    methods: {
        //当隐藏动画结束的时候，摧毁该组件
        destoryElement(){
            this.$el.removeEventListener('transitionend', this.destoryElement);
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
        closeEvent(){
            this.visible = false;
            //如果回调存在，则执行
            if(typeof this.onClose === 'function'){
                this.onClose(this);
            }
            this.reject();//点击"X"相当于点击取消
        },
        cancelEvent(){
            this.visible = false;
            this.reject();
        },
        confirmEvent(){
            this.visible = false;
            this.resolve();
        },
        comfirm(){ //供外部js调用
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
    }
}
</script>


<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
    transition: opacity .3s
.fade-enter, .fade-leave-active
    opacity: 0
//.confirm设置为fixed定位，可以会受外层影响,外层js控制它居中
.confirm
    position: fixed
    top: 50%
    left: 50%
    width: 300px
    padding: 10px
    font-size: 12px
    background-color: #fff
    border-radius: 2px
    border: 1px solid #d1dbe5
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
    .confirm-header
        position: relative
        .confirm-title
            font-size: 16px
            font-weight: 700
        .confirm-close
            position: absolute
            top: 0
            right: 0
            cursor: pointer
    .confirm-body
        position: relative
        padding: 20px 0px
        .confirm-img
            position: absolute
            top: 50%
            transform: translateY(-50%)
            vertical-align: baseline
        .confirm-content
            font-size: 14px
            margin-left: 32px
            color: #48576a
     .confirm-footer
         text-align: right
        button
            line-height: 16px
            height: 18px
            background-color: #fff
            color: #009688
            border: 1px solid #009688
            border-radius: 3px
            outline: none
            cursor: pointer
            &:hover
                background-color: #009688
                color: #fff
            &:nth-child(2)
                margin-left: 3px
                background-color: #009688
                color: #fff
</style>