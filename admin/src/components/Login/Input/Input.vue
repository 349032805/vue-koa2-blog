<template>
    <div class="input-wrapper">
        <label ref="title" :for="title" class="input-label">{{ title }}</label>
        <input autocomplete="new-password" :type="type" @focus.stop="focusEvent" @blur.stop="blurEvent" :value="value" @input="inputEvent($event.target.value)" :id="title"
        @keyup.enter="keyupEvent">
        <div class="line" ref="line"></div>
    </div>
</template>

<script>
export default {
    props: {
       title: {
           type: String,
           default: 'custom-title'
       },
       value: {
           type: String,
           default: ''
       },
       type: {
            default: 'text',
            validator: function(val){
                return ['text', 'password'].indexOf(val) > -1;
            }
       }
    },
    methods: {
        focusEvent(){
            let oTitle = this.$refs.title;
            let oLine = this.$refs.line;
            oTitle.style.color = 'rgb(82,97,107)';
            oTitle.style.webkitTransform = 'translate(0, -30px) scale(.5)';
            oTitle.style.MozTransform = 'translate(0, -30px) scale(.5)';
            oTitle.style.msTransform = 'translate(0, -30px) scale(.5)';
            oTitle.style.OTransfrom = 'translate(0, -30px) scale(.5)';
            oTitle.style.transform = 'translate(0, -30px)';
            oTitle.style.fontSize = '25px'
            oLine.style.width = '500px';
        },
        blurEvent(){
            if(this.value === ''){
                let oTitle = this.$refs.title;
                let oLine = this.$refs.line;
                oTitle.style = '';
                oLine.style = '';
            }
        },
        inputEvent(val){
            this.$emit('input', val);
        },
        keyupEvent(){
            this.$emit('enter');
        }
    }
}
</script>

<style lang="stylus" scoped>
.input-wrapper
    margin: 40px auto
    position: relative
    width: 500px
    input
        width: 100%
        padding: 10px 0
        font-size: 20px
        border: none
        border-bottom: 1px solid #d5d5d5
        text-indent: 10px
        outline: none
    label
        position: absolute
        top: 2px
        font-size: 32px
        color: #3f4f5b
        transition: all .3s
    .line
        position: absolute
        left: 0
        bottom: 0
        width: 0
        height: 2px
        background: #F09313
        transition: all 0.3s ease-in-out .1s    
</style>