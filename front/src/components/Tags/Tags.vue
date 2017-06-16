<template>
  <div class="tags-list">
    <div class="tags-wrapper">
      <h2>All Tags</h2>
      <ul>
        <li v-for="item in 30"><a href="#">标签{{item}}</a></li>
      </ul>
    </div>
    <div class="tags-article" v-for="item in 10">
      <h3>标签一</h3>
      <ul>
        <li>
          <a href="#"><span class="title">Vue源码详解:compile,link,依赖,批处理...一网打尽，全解析! </span></a>
        </li>
        <li>
          <a href="#"><span class="title">Vue源码详解:compile,link,依赖,批处理...一网打尽，全解析! </span></a>
        </li>
        <li>
          <a href="#"><span class="title">Vue源码详解:compile,link,依赖,批处理...一网打尽，全解析! </span></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
.tags-list
  div.tags-wrapper
    h2
      font-size: 22px
      font-weight: 700
    ul
      font-size: 0
      li
        display: inline-block
        padding: 15px 10px 0 0
        a
          font-size: 20px
          font-weight: 700
          color: $green
  div.tags-article
    margin: 30px 0
    h3
      font-size: 20px
      font-weight: 700
    ul 
      padding: 10px
      li
        font-weight: 700
        list-style: disc
        margin: 20px
       span.title
        color: $green
@media screen and (max-width: 480px)
  .tags-list
    div.tags-wrapper
      margin-bottom: 20px
      h2
        font-size: 20px
      ul
        li
          padding: 10px 5px 0 0
          a
            font-size: 16px
    div.tags-article
      margin: 20px 0
      h3
        font-size: 16px
      ul 
        padding: 3px
        li
          margin: 0 0px 0 20px
</style>