<template>
    <div id="aaa">
        login sinner 77 hahhaah 
        <p @click="cccc">哈哈哈</p>
        <v-input></v-input>
    </div>
</template>

<script>
import Input from 'components/Input/Input'

export default {
    data(){
        return {
            msg: 'msg'
        }
    },
    components: {
        'v-input': Input,
    },
    methods: {
        cccc(){
            this.$message();
        }
    }
}
</script>

<style scoped lang="stylus">

</style>