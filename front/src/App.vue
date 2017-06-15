<template>
    <div id="app">
        <v-header></v-header>
        <main class="container">
            <router-view></router-view>
        </main>
        <v-footer></v-footer>                  
    </div>        
</template>

<script>
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

export default {
    components: {
      'v-header': Header,
      'v-footer': Footer
    }
}
</script>

<style lang="stylus" scoped>
@import 'assets/stylus/_setting.styl';
#app
    height: 100%
    .container
        box-sizing: border-box
        max-width: 1000px
        min-height: 100%
        margin: 0 auto
        margin-bottom: -60px
        padding: 100px 20px 0 20px
        &:after
            content: ""
            height: 60px
            display: block
</style>
