<template>
    <div class="page">
        <header>header</header>
        <aside>
            <v-aside></v-aside>
        </aside>
        <section id="scroll-section">
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
    header
        position: fixed
        left: 0
        right: 0
        top: 0
        height: 60px
        background: $green
    aside
        position: fixed
        left: 0
        top: 60px
        bottom: 0
        width: 256px
    section
        position: absolute
        top: 60px
        left: 256px
        right: 0
        bottom: 0
        overflow: hidden
</style>