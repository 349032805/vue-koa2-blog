<template>
    <div class="page">
        <header>
            <a href="/admin"><img src="../../assets/logo.png" alt="logo.png" width="160px" class="logo"></a>
            <div class="logout">
                <i class="iconfont icon-directions_run icon-icondirectionsrun"></i>
            </div>
        </header>
        <aside>
            <v-aside></v-aside>
        </aside>
        <section>
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import Aside from '../Aside/Aside';

export default {
    components: {
        'v-aside': Aside
    },
    mounted(){
    
    }
}
</script>

<style scoped lang="stylus">
@import '../../assets/stylus/_setting'
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
            i
                font-size: 22px
                color: $green
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