<template>
    <div class="input-wrapper">
        <label for="cart">card</label>
        <input type="text" id="cart">
        <div class="line"></div>
    </div>
</template>

<script>
    
</script>

<style lang="stylus" scoped>
.input-wrapper
    margin: 0 auto
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
        color: #3f4f5b
        transition: all 0.3s
    .line
        width: 0
        height: 2px
        background: #2384ea    
</style>