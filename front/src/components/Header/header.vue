<template>
  <header>
    <nav class="nav cf">
      <div class="nav-logo">
        <span class="name">sinner77</span>
        <span class="sign">简单是我最爱</span>
      </div>
      <ul class="nav-list">
        <li><router-link to="/articles" active-class="active" class="hover-underline">文章</router-link></li>
        <li><router-link to="/tags" active-class="active" class="hover-underline">标签</router-link></li>
        <li><router-link to="/archives" active-class="active" class="hover-underline">归档</router-link></li>
        <li><router-link to="/about" active-class="active" class="hover-underline">关于我</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
//使其脱离文档流，所以用了absolute
header
  position: absolute
  top: 0
  left: 0
  right: 0
  background-color: #fff
  box-shadow: 0 0 4px rgba(0,0,0,.25)
  .nav
    max-width: 1000px
    margin: 0 auto
    .nav-logo
      height: 60px
      float: left
      span
        display: block
      span.name
        height: 30px
        line-height: 40px
    .nav-list
      float: right
      font-size: 0
      li
        display: inline-block
        font-size: 16px
        height: 60px
        line-height: 60px
        font-weight: 700
        margin: 0 5px
        a.active::before 
          background-color: $green
          transform: scaleX(1)
</style>