<template>
    <transition name="slide-fade">
            <div v-show="visible" class="message" @mouseenter="clearTimer" @mouseleave="startTimer">
                <img :src="svgSrc" alt="svg" class="message-image">
                <div class="message-content">
                    <p class="text">{{ message }}</p>
                    <div v-if="showClose" @click="close" class="close-btn">
                        <img src="../assets/close.svg" alt="close" width="20px" height="20px">
                    </div>
                </div>
            </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {
            visible: false,
            message: '没有内容！',
            duration: 1200,
            type: 'success',
            onClose: null,  //关闭后的回调
            showClose: true, 
            closed: false,
            timer: null
        }
    },
    computed: {
        svgSrc(){
            return require(`../assets/${ this.type }.svg`);
        }
    },
    methods: {
        close(){
            this.closed = true;
            if(typeof this.onClose === 'function'){
                this.onClose(this);
            }
        },
        destroyElement(){
            this.$el.removeEventListener('transitionend', this.destroyElement);
            //完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
        clearTimer(){
            clearTimeout(this.timer);
            this.timer = null;
        },
        startTimer(){
            if(this.duration > 0){
                this.timer = setTimeout(() => {
                    if(!this.closed){
                        this.close();
                    }
                }, this.duration);
            }
        }
    },
    watch: {
        closed(newVal){
            if(newVal){
                //让message组件隐藏，并监听动画执行完毕后的事件
                this.visible = false;
                this.$el.addEventListener('transitionend', this.destroyElement);
            }
        }
    },
    mounted(){
        this.startTimer();
    }
}
</script>

<style lang="stylus" scoped>
.slide-fade-enter-active
    transition: all .5s ease
.slide-fade-leave-active
    transform: translate3d(0, 0, 0);
    transition: all .3s ease
.slide-fade-enter, .slide-fade-leave-active
    transform: translateX(100px)
    opacity: 0
.message
    position: fixed
    top: 30%
    right: 0
    margin-top: -140px
    width: 280px
    height: 60px
    border-radius: 5px
    background: #EEBD22
    box-shadow: -1px 3px 14px #8A8A8A;
    margin-bottom: 22px
    .message-image
        width: 30px
        height: 30px
        margin: 15px 10px 0 15px
        float: left
    .message-content
        .text
            color: #fff
            font-size: 14px
            height: 60px
            line-height: 60px
        .close-btn
            position: absolute
            top: 3px
            right: 2px
            text-align: center
            width: 30px
            height: 30px
            line-height: 30px
            img
                vertical-align: middle
</style>