<template>
    <div class="tags-wrapper">
        <div class="tags">
            <v-tag v-for="(item, index) in tags" :tagName="item" :index="index"
            @changeValue="changeTag"
            @deleteTag="deleteTag"
            ></v-tag>
        </div>
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
import Tag from './Tag/Tag';
import Loading from 'components/common/Loading/Loading';
import { mapState } from 'vuex';

export default {
    data(){
        return {
            loading: true
        }
    },
    computed:{
        ...mapState({
            allArticles: state => state.article.allArticles,
            allTags: state => state.article.allTags
        }),
        tags(){
            return this.allTags.map(o => o.name);
        }
    },
    created(){
        this.$store.dispatch('getAllTags')
            .then((res) => {
                this.loading = false;
            })
            .catch(err => {
                this.$message({
                    type: 'error',
                    message: '获取所有标签失败!'
                });
            })
    },
    mounted(){
    },
    methods: {
        //改变标签内容
        changeTag({ val, index }){
            let id = this.allTags[index]._id;
            this.$store.dispatch('modifyTag', { val, id })
                .then(res => {
                    this.$message({
                        type: 'error',
                        message: '修改标签成功!'
                    });
                })
                .catch(err => {
                    this.$message({
                        type: 'error',
                        message: '修改标签失败!'
                    });
                });
        },
        deleteTag(index){
            let id = this.allTags[index]._id;
            this.$store.dispatch('deleteTag', id)
                        .then(res => {
                            if(res){
                                this.$message({
                                    type: 'success',
                                    message: '该标签删除成功！'
                                });
                            }
                        })
                        .catch(err => {
                            console.log('删除标签失败！');
                            this.$message({
                                type: 'error',
                                message: '删除失败！'
                            });
                        });
        }
    },
    components: {
        'v-tag': Tag,
        'v-loading': Loading
    }
}
</script>


<style lang="stylus" scoped>
@import '../../../assets/stylus/_setting';
.tags-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .tags
        box-sizing: border-box
        width: calc(100% - 20px)
        padding: 10px
</style>