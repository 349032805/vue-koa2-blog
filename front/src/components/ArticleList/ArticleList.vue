<template>
  <div class="articles-list">
    <article v-for="item in 5">
      <header>
        <h1 class="title"><a href="" class="hover-underline">浏览器渲染详细过程：重绘、重排和composite只是冰山一角</a></h1>
        <p class="createTime">2017-04-10 01:10:09</p>
      </header>
      <p class="content">
        在之前的一篇文章中：Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！，我说过，偶然在一次对task和microtask的讨论当中，研究到了浏览器在处理完task和microtask之后执行的渲染机制，当时看到这个内容，还是挺激动的，因为以前从来不知道我在js里更改的样式，浏览器到底是什么时候、以怎样的方式渲染到界面上的，于是兴奋的写下了上述文章。

最近深入研究了这部分，发现这里有一片更广阔的新大陆，在我们耳熟能详的重排、重绘、composite、合成层提升等概念下还有更深的的东西。这篇文章将会介绍浏览器的详细渲染过程。
      </p>
      <footer>
        <a class="continue hover-underline" href="">...continue reading</a>
      </footer>
    </article>
  </div> 
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
.articles-list
  max-width: 850px
  margin: 0 auto
  article
    margin-bottom: 30px
    header
      text-align: left
      .title
        font-size: 24px
        font-weight: 700
      .createTime
        color: #7f8c8d
        margin: 10px 0 10px 0
    p.content
      font-size: 15px
      font-family: -apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif
      line-height: 1.5
      letter-spacing: 1px
      color: #34495e
    footer
      margin-top: 10px
      a.continue
        font-size: 14px
        color: $green
</style>