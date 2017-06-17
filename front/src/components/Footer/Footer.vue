<template>
    <footer>
      <p>Copyright © <a href='https://github.com/sinner77' target="_blank">twinkle</a>&nbsp;&nbsp;2017 </p>
      <p>Created by <a href="https://github.com/sinner77/my-blog" target="_blank">vue-koa2-blog</a></p>
    </footer>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
footer
  height: 60px
  font-size: 14px
  text-align: center
  color: #bfbfbf
  line-height: 20px
  a 
    text-decoration: none
    color: $green
    &:hover
      text-decoration: underline
@media screen and (max-width: 480px)
  footer
    height: 40px
    font-size: 12px
    text-align: center
    color: #bfbfbf
    line-height: 20px
</style>