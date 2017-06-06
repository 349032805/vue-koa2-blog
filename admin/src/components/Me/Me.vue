<template>
    <div class="article">
        <v-page :total="100" :limit="6" @newPage="getNew(i)"></v-page>
    </div>
</template>

<script>
import Pagination from 'components/Pagination/Pagination';

export default {
    components: {
        'v-page': Pagination
    },
    methods: {
        getNew(i){
            console.log(i);
        }
    }
}
</script>

<style lang="stylus" scoped>
    
</style>