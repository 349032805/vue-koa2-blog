<template>
    <div class="article">
        <v-page :total="100" :limit="6" @newPage="getNew(i = arguments[0])"></v-page>
        <button @click="clickEvent">click</button>
    </div>
</template>

<script>
import Pagination from 'components/Pagination/Pagination';
import Confirm from '../Confirm';

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
            this.$confirm('???', '!!!').then(() => {
                console.log('确实');
            }).catch(() => {
                console.log('取消');
            });
        }
    },
}
</script>

<style lang="stylus" scoped>
    
</style>