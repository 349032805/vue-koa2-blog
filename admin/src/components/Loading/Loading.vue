<template>
    <div :style="loadingStyle" class="loading-wrapper" v-html="svgString">
    </div>
</template>

<script>
import * as types from './loading-svg'

export default {
    props: {
        type: {
            type: String,
            default: 'video'
        },
        color: {
            type: String,
            default: '#1ABC9C'
        },
        size: {
            type: Object,
            default(){
                return {
                    width: '35px',
                    height: '35px'
                }
            }
        }
    },
    computed: {
        loadingStyle(){
            return {
                width: this.size.width,
                height: this.size.height,
                fill: this.color
            }
        },
        svgString(){
            return types[this.type];
        }
    }
}
</script>

<style lang="stylus" scoped>
    .loading-wrapper
        margin: auto
</style>