<template>
    <div class="loading-wrapper">
        <img :src="svgSrc" alt="svg-loading" :style="loadingStyle">
    </div>
</template>

<script>
/*
    可传: type && size = { width: xxpx, height: xxpx }
*/
export default {
    name: 'loading',
    props: {
        type: {
            type: String,
            default: 'default'
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
            }
        },
        svgSrc(){
            return require(`./assets/${ this.type }.svg`);
        }
    }
}
</script>

<style lang="stylus" scoped>
.loading-wrapper
    text-align: center
    margin: 100px 0
</style>