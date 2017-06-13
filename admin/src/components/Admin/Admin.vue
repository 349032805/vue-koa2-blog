<template>
    <div class="page">
        <header>
            <a href="/"><img src="../../assets/logo.png" alt="logo.png" width="160px" class="logo"></a>
            <div class="logout">
                <i class="iconfont icon-directions_run icon-icondirectionsrun logout-icon" @click.stop="logout"></i>
            </div>
        </header>
        <aside>
            <v-aside></v-aside>
        </aside>
        <section>
            <transition name="slide">
                <keep-alive><router-view></router-view></keep-alive>
            </transition>
        </section>
    </div>
</template>

<script>
import Aside from './Aside/Aside';

export default {
    components: {
        'v-aside': Aside
    },
    methods: {
        logout(){
            this.$confirm('此操作将退出该博客管理系统,是否继续?', '提示')
                .then(() => {
                    this.$store.commit('TOKEN_DELETE');
                    this.$store.commit('RESET');
                    if(!this.$store.state.token.token){
                        this.$router.push('/login');
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                    }else{
                        this.$message({
                            type: 'success',
                            message: '退出失败!'
                        });
                    }
                })
                .catch(() => {});
        }
    }
}
</script>

<style scoped lang="stylus">
@import '../../assets/stylus/_setting'
.slide-enter-active
    transition: all .2s ease
.slide-enter
    transform: translateX(300px);
.slide-leave-active
    opacity: 0;

.page
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: $grey
    header
        box-sizing: border-box
        position: fixed
        left: 0
        right: 0
        top: 0
        height: 60px
        line-height: 60px
        padding: 0 10px
        background-color: $white
        box-shadow:0px 1px 2px #969696
        .logo
            vertical-align: middle
        .logout
            float: right
            i.logout-icon
                font-size: 22px
                color: $green
                cursor: pointer
    aside
        position: fixed
        left: 0
        top: 60px
        bottom: 0
        width: 130px
    section
        position: absolute
        min-width: 630px
        top: 70px
        left: 140px
        right: 0
        bottom: 0
        background-color: $clearWhite
        overflow: hidden
</style>