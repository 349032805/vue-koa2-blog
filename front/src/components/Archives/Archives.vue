<template>
  <div class="archives-list">
    <h2>归档</h2>
    <div class="archives-content" v-for="item in 11">
      <h3>2017年05月 (1)</h3>
      <ul>
        <li>
          <a class="title" href="#">vue2服务端渲染：直连数据库的首屏优化策略</a><span class="createTime">2017-05-05</span>
        </li>
        <li>
          <a class="title" href="#">vue2服务端渲染：直连数据库的首屏优化策略</a><span class="createTime">2017-05-05</span>
        </li>
        <li>
          <a class="title" href="#">vue2服务端渲染：直连数据库的首屏优化策略</a><span class="createTime">2017-05-05</span>
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
.archives-list
  max-width: 900px
  margin: 0 auto
  h2
    font-size: 22px
    font-weight: 700
    margin-bottom: 30px
  div.archives-content
    h3
      font-size: 16px
      font-weight: 700
    ul 
      li
        font-weight: 700
        list-style: disc
        margin: 20px
       a.title
        color: $green
        padding-right: 10px
       span.createTime
        color: $light
        font-size: 14px
        font-style: italic
@media screen and (max-width: 480px)
  .archives-list
    h2
      font-size: 20px
      margin-bottom: 10px
    div.archives-content
      h3
        font-size: 16px
      ul 
        padding: 3px
        margin-bottom: 10px
        li
          margin: 0 0 0 20px
</style>