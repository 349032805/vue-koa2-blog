<template>
    <div class="list-wrapper">
        <form>
            <label for="search" class="search">Search</label>
            <input type="text" id="search" v-model="searchText" class="search-input">
        </form>
        <table>
            <thead>
                <tr>
                    <th v-for="(item,index) in colums">{{ item }}</th>
                    <th class="operaton-th">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tr, index) in dataArr">
                    <td v-for="(td, index) in tr" :class="[index === 'title' ? 'title': '', index === 'abstract' ? 'abstract': '']">
                        <span v-if="td !== true && td !== false">{{ td }}</span>
                        <span v-else-if="td === true" class="published">published</span>
                        <span v-else="td === false" class="draft">draft</span>
                    </td>
                    <td class="operation-td">
                        <button class="editor-btn" @click="editorEvent(index)">编辑</button>
                        <button v-if="tr['publish'] === true" class="publish-btn" @click="notPublishEvent(index)">取消发布</button>
                        <button v-else class="publish-btn" @click="publishEvent(index)">发布</button>
                        <button class="delete-btn" @click="deleteEvent(index)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchText: ''
        }
    },
    props:{
        colums: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    computed: {
        dataArr(){
            let arr = [];
            arr = this.data.filter((val) => {
                return val['title'].indexOf(this.searchText) > -1;
            });
            return arr;
        }
    },
    methods: {
        //点击了编辑
        editorEvent(index){
            this.$confirm('此操作将进入编辑当前文章,是否继续?', '提示')
                .then(() => {
                    this.$emit('editor', index);
                })
                .catch(() => {});
        },
        //点击了取消发布
        notPublishEvent(index){
            this.$confirm('此操作将取消发布当前文章,是否继续?', '提示')
                .then(() => {
                    this.$emit('notPublish', index);
                })
                .catch(() => {});
        },
        //点击了发布
        publishEvent(index){
            this.$confirm('此操作将发布当前文章,是否继续?', '提示')
                .then(() => {
                    this.$emit('publish', index);
                })
                .catch(() => {});
        },
        //点击了删除
        deleteEvent(index){
            this.$confirm('此操作将删除当前文章,是否继续?', '提示')
                .then(() => {
                    this.$emit('delete', index);
                })
                .catch(() => {});
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../../../assets/stylus/_setting.styl'

.list-wrapper
    .search
        font-size: 20px
        color: $green
        vertical-align: middle
    .search-input
        border: none
        border-bottom: 1px solid $green
        width: 300px
        margin-bottom: 20px
        height: 30px
        padding-left: 8px
        outline: none
    //加了table-layout:fixed后，列的宽度由由第一行决定
    table
        table-layout:fixed
        width: 100%
        border-right: 1px solid #dfe3ec
        border-bottom: 1px solid #dfe3ec
        text-align: center
        td, th
            border-left: 1px solid #dfe3ec
            border-top: 1px solid #dfe3ec
        thead
            background-color: #eef0f6
            th
                height: 40px
                line-height: 40px
                font-weight: 700
                &:nth-child(1)
                    width: 200px
                &:nth-child(3)
                    width: 220px
                &:nth-child(4)
                    width: 125px
            .operaton-th
                width: 220px
        tbody
            tr:hover
                background-color: #eef0f6
            td
                padding: 10px 20px
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                .published
                    background-color: rgba(18,206,102,.1)
                    border: 1px solid #000
                    border-color: rgba(18,206,102,.2)
                    border-radius: 5px
                    padding: 3px 10px
                    color: #00643b
                .draft
                    background-color: #e4e6f1
                    border: 1px solid #000
                    border-color: #e4e6f1
                    border-radius: 5px
                    padding: 3px 10px
                    color: #48516a
                &.operation-td
                    text-align: left
                button
                    padding: 7px 9px
                    font-size: 12px
                    border-radius: 4px
                    color: #fff
                    border: 1px solid transparent
                    cursor: pointer
                    outline: none
                    &:hover
                        opacity: 0.8
                    &.editor-btn
                        background-color: #009688
                        border-color: #009688
                    &.publish-btn
                        background-color: #1d90e6
                        border-color: #1d90e6
                    &.delete-btn
                        background-color: #e64242
                        border-color: #e64242
</style>