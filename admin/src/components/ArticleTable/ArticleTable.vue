<template>
    <table>
        <thead>
            <tr>
                <th v-for="item in colums">{{ item }}</th>
                <th class="operaton-th">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tr, index) in dataArr">
                <td v-for="td in tr">
                    <span v-if="td !== true && td !== false">{{ td }}</span>
                    <span v-else-if="td === true" class="published">published</span>
                    <span v-else="td === false" class="draft">draft</span>
                </td>
                <td class="operation-td">
                    <button class="editor-btn" @click="editorEvent(index)">编辑</button>
                    <button v-if="tr['publish'] === true" class="publish-btn" @click="draftEvent(index)">取消发布</button>
                    <button v-else class="publish-btn" @click="publishEvent(index)">发布</button>
                    <button class="delete-btn" @click="deleteEvent(index)">删除</button>
                </td>
            </tr>

        </tbody>
    </table>
</template>

<script>
export default {
    data(){
        return {
            colums: ['文章标题', '创建时间', '最后修改时间', '状态'],
            dataArr: [
                { title: '我是title我是title我是title', createTime: '2015-10-10', modifyTime: '2015-10-12', publish: true },
                { title: '我是title', createTime: '2015-10-10', modifyTime: '2015-10-12', publish: false },
                { title: '我是title', createTime: '2015-10-10', modifyTime: '2015-10-12', publish: true },
                { title: '我是title', createTime: '2015-10-10', modifyTime: '2015-10-12', publish: false },
                { title: '我是title', createTime: '2015-10-10', modifyTime: '2015-10-12', publish: true }
            ]
        }
    },
    methods: {
        //点击了编辑
        editorEvent(index){
            this.$confirm('此操作将进入编辑当前文章,是否继续?', '提示')
                .then(() => {
                    console.log(index);
                })
                .catch(() => {

                });
        },
        //点击了取消发布
        draftEvent(){
            this.$confirm('此操作将取消发布当前文章,是否继续?', '提示')
                .then(() => {

                })
                .catch(() => {

                });
        },
        //点击了发布
        publishEvent(){
            this.$confirm('此操作将发布当前文章,是否继续?', '提示')
                .then(() => {

                })
                .catch(() => {

                });
        },
        //点击了删除
        deleteEvent(){
            this.$confirm('此操作将删除当前文章,是否继续?', '提示')
                .then(() => {

                })
                .catch(() => {

                });
        }
    }
}
</script>

<style lang="stylus" scoped>
table
    width: 96%
    margin: 0 auto
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
        .operaton-th
            width: 220px
    tbody
        tr:hover
            background-color: #eef0f6
         td
            padding: 10px 20px
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