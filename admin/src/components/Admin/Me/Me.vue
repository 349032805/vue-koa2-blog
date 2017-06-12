<template>
    <div class="me-wrapper">
        <div class="me">
            <h2>Press Ctrl+S to save the info...</h2>
            <textarea name="me" v-model="meText" ref="textInput" @keydown="save($event)" class="meInput"></textarea>
        </div>
    </div>
</template>

<script>
import T from '../../../axios/me';

export default {
    data(){
        return {
            meText: '',
            oldText: ''
        }
    },
    methods: {
        save(e){
            if(e.keyCode === 83 && e.ctrlKey == true){
                if(this.meText === ''){
                    this.$message({
                        type: 'warning',
                        message: '个人信息不能为空!'
                    });
                    this.meText = this.oldText;
                    e.preventDefault();  
                    return;
                }
                this.$confirm('此操作将更新个人信息,是否继续?', '提示')
                .then(() => {
                    T.modifyMeInfo(this.meText)
                        .then(res => {
                            if(res.data.code === 200){
                                this.$message({
                                    type: 'success',
                                    message: '修改个人信息成功!'
                                });
                            }
                        })
                        .catch(err => {
                            this.$message({
                                type: 'error',
                                message: '修改个人信息失败!'
                            });
                        });
                    
                })
                .catch(() => {}); 
                e.preventDefault();  
            }    
        }
    },
    activated(){
        T.getMeInfo()
            .then(res => {
                if(res.data.code === 200){
                    let content = res.data.data.content;
                    this.meText = content;
                    this.oldText = content;
                }
            })
            .catch(err => {
                this.$message({
                    type: 'error',
                    message: '获取个人信息失败！'
                });
            })
    }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/_setting';
.me-wrapper
    width: calc(100% + 20px)
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    .me
        box-sizing: border-box
        width: calc(100% - 20px)
        padding: 10px
        h2
            font-size: 20px
            color: $green
            margin: 20px 0
        .meInput
            font-family: Helvetica Neue,Helvetica,PingFang SC
            border: 1px solid $green
            outline: none
            width: 600px
            height: 450px
            padding: 10px
            font-size: 14px
            
</style>