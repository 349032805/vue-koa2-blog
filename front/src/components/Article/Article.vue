<template>
  <div class="article-warpper">
      <article class="article">
        <h1>标题1</h1>
        <p v-for="item in 31">main很容易就搞定了，此时来看看sidebar，它迫不得已抛弃了float。
        我们来看看sidebar的特点：在右边，宽度300，它的定位对main不影响——很明显，
        一个绝对主义分子诞生了。</p>
      </article>
      <aside class="catalog">
        目录
        <p v-for="item in 11">目录{{item}}</p>
      </aside>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.article-warpper
  position: relative
  .article
    margin-right: 230px
  .catalog
    position: absolute
    top: 0
    right: 0
    width: 220px
</style>