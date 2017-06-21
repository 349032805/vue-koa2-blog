<template>
    <div id="app">
        <v-header></v-header>
        <main class="container">
            <transition name="fade" mode="out-in">
                <keep-alive><router-view></router-view></keep-alive>
            </transition>
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
<style lang="stylus">
@import 'assets/stylus/markdown.styl'
@import 'assets/stylus/code.styl'
</style>


<style lang="stylus" scoped>
@import 'assets/stylus/_setting.styl';
.fade-transition
  transition: opacity .2s ease
.fade-enter, .fade-leave
  opacity: 0;
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
@media screen and (max-width: 480px)
  #app
    .container
        margin-bottom: -40px
        padding: 85px 10px 0 10px
        &:after
            content: ""
            height: 40px
            display: block
</style>
