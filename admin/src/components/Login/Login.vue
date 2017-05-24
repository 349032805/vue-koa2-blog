<template>
    <div class="login-wrapper">
        <v-input v-model="username" title="username"></v-input>
        <v-input v-model="password" title="password" type="password"></v-input>
        <button>登录</button>
    </div>
</template>

<script>
import Input from 'components/Input/Input'

export default {
    data(){
        return {
            msg: 'msg',
            username: '',
            password: ''
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
.login-wrapper
    width: 600px
    margin: 200px auto
    button
        display: block
        margin: 0 auto
        text-align: center
        width: 500px
        height: 50px
</style>