<template>
    <transition>
        <div class="confirm">
            <div class="confirm-header">
                <span class="confirm-title">{{ title }}</span>
                <div class="confirm-close">X</div>
            </div>
            <div class="confirm-body">
                <div class="confirm-img">
                    <img src="../assets/warn.svg" alt="warn" width="30px">
                </div>
                <span class="confirm-content">{{ content }}</span>
            </div>
            <div class="confirm-footer">
                <button>{{ cancelButtonText }}</button>
                <button>{{ confirmButtonText }}</button>
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
            cancelButtonText: '取消'
        }
    }
}
</script>


<style lang="stylus" scoped>
//.confirm设置为fixed定位，可以会受外层影响
.confirm
    position: fixed
    top: 50%
    left: 50%
    transform: translateY(-50%)
    transform: translateX(-50%)
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
            background-color: #fff
            color: #009688
            border: none
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