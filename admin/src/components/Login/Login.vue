<template>
    <div class="login-wrapper">
        <v-input v-model="username" title="username"></v-input>
        <v-input v-model="password" title="password" type="password" @enter="login"></v-input>
        <button @click.stop="login">登录</button>
    </div>
</template>

<script>
import Input from './Input/Input';
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
        login(){
            if(this.username === ''){
                this.$message({
                    type: 'warning',
                    message: '用户名不能为空!'
                });
                return;
            }
            if(this.password === ''){
                this.$message({
                    type: 'warning',
                    message: '密码不能为空!'
                });
                return;
            }
            let username = this.username;
            let password = this.password;
            this.$store.dispatch('createToken', { username, password})
                .then(res => {
                    if(res === true){
                        let redirectUrl = '';
                        if(this.$route.query.redirect){
                            redirectUrl = decodeURIComponent(this.$route.query.redirect);
                        }else{
                            redirectUrl = '/admin/article';
                        }
                        this.$router.push({
                            path: redirectUrl
                        });

                        this.$message({
                            type: 'success',
                            message: '登录成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '用户名或密码错误!'
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                            type: 'error',
                            message: '登录失败!'
                        });
                });
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
        font-size: 25px
        background: #F09313
        color: #fff
        border-radius: 5px
        border: none
</style>