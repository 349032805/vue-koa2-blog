<template>
  <header>
    <nav class="nav cf">
      <router-link to="/articles">
        <div class="nav-logo">
          <span class="name">twinkle</span>
          <span class="sign">{{ sign[0] }}</span>
        </div>
      </router-link>
      <ul class="nav-list">
        <li><router-link to="/articles" active-class="active" class="hover-underline">文章</router-link></li>
        <li><router-link to="/tags" active-class="active" class="hover-underline">标签</router-link></li>
        <li><router-link to="/archives" active-class="active" class="hover-underline">归档</router-link></li>
        <li><router-link to="/about" active-class="active" class="hover-underline">关于我</router-link></li>
      </ul>
      <a href="javascript:;" id="pull" @click.stop="showNavAside = !showNavAside"><i class="iconfont icon-icon"></i></a>
    </nav>
    <div class="nav-aside" :class="{'nav-aside-show': showNavAside}">
      <ul>
        <li><router-link to="/articles" active-class="active">文章</router-link></li>
        <li><router-link to="/tags" active-class="active">标签</router-link></li>
        <li><router-link to="/archives" active-class="active">归档</router-link></li>
        <li><router-link to="/about" active-class="active">关于我</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      sign: [
      '外表平静如水，内心坚定如山。', 
      '在某个时刻，你不得不意识到，有的人可以留在你的心里，却不会出现在你的生活中了', 
      '​​​​小时候，幸福是件很简单的事；长大后，简单是件很幸福的事。'
      ],
      showNavAside: false
    }
  }
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
  font-family: 'logoFont'
  .nav
    max-width: 1000px
    margin: 0 auto
    .nav-logo
      height: 60px
      float: left
      span
        display: block
      span.name
        height: 32px
        font-size: 31px
        padding-left: 6px
        font-family: 'Dancing in the Rainbow'
      span.sign
        font-size: 20px
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
        font-size: 20px
        a.active::before 
          background-color: $green
          transform: scaleX(1)
     a#pull
       display: none
  .nav-aside
    display: none
    position: absolute
    background-color: #f9f9f9
    right: 0
    top: 60px
    z-index: 999
    box-shadow: 0 0 4px rgba(0,0,0,.25)
    ul 
      li
        font-size: 25px
        a 
         display: block
         &:active, &:focus
          border-bottom: 2px solid $green
   .nav-aside-show 
    display: block
//先让签名隐藏
@media screen and (max-width: 530px)
  header
    .nav
      .nav-logo
        span.sign
          display: none
        span.name
          height: 60px
          line-height: 60px
//签名和名字居中，同时3个小点显示出来
@media screen and (max-width: 480px)
  header
      .nav
        position: relative
        text-align: center
        .nav-logo
          float: none
          display: inline-block
          span.sign
            display: block
            font-size: 16px
          span.name
            height: 30px
            line-height: 40px
            font-size: 25px
        .nav-list
          display: none
          float: none
        a#pull
          position: absolute
          top: 50%
          right: 0
          transform: translateY(-50%) rotate(90deg)
          display: block
          width: 50px
          height: 30px
          line-height: 30px
          i.icon-icon
            font-size: 25px
//签名显示
@media screen and (max-width: 320px)
  header
      .nav
        .nav-logo
          float: none
          display: inline-block
          span.name
            font-size: 18px
            height: 60px
            line-height: 60px
          span.sign
            display: none
</style>