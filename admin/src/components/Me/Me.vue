<template>
    <div class="article">
        <v-page :total="100" :limit="6" @newPage="getNew(i = arguments[0])"></v-page>
        <v-confirm></v-confirm>
    </div>
</template>

<script>
import Pagination from 'components/Pagination/Pagination';
import Confirm from '../Confirm/src/main.vue';

export default {
    components: {
        'v-page': Pagination,
        'v-confirm': Confirm
    },
    mounted(){
    },
    methods: {
        getNew(i){
            console.log('分页得到的页数:' + i);
        },
        clickEvent(){
            this.$message('aaa');
        }
    },
}
</script>

<style lang="stylus" scoped>
    
</style>