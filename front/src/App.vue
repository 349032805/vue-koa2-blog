<template>
    <div id="app">
        <v-header></v-header>
        <session class="container">
            <router-view></router-view>
        </session>
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

</style>
