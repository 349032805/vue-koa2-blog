<template>
  <div class="articles-list">
    <article v-for="item in articles" class="border-1px">
      <header>
        <h1 class="title"><a href="" class="hover-underline">{{ item.title }}</a></h1>
        <p class="createTime">{{ item.createTime }}</p>
      </header>
      <p class="markdown" v-html="parser(item.abstract)"></p>
      <ul class="tags">
        <i class="iconfont icon-tag1"></i>
        <li v-for="tag in item.tags">{{ tag.name }}</li>
      </ul>
      <footer>
        <a class="continue hover-underline" href="">...read more</a>
      </footer>
    </article>
  </div> 
</template>

<script>
import api from '../../api';
import marked from '../../assets/js/marked.js';

export default {
  data(){
    return {
      articles: []
    }
  },
  created(){
     api.getArticlesByPage(1, 5)
        .then(res => {
          if(res.data.code === 200){
            this.articles = res.data.data.slice(0);
          }
        })
        .catch(err => {
          console.log('获取文章失败！');
        });
  },
  methods: {
    parser(value){
      return marked(value);
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
@import '../../assets/stylus/mixin.styl';


.articles-list
  max-width: 850px
  margin: 0 auto
  article
    margin-bottom: 30px
    border-1px(#ddd)
    padding-bottom: 3px
    &:last-child 
      margin-bottom: 15px
    header
      text-align: left
      .title
        font-size: 24px
        line-height: 1.3
        font-weight: 700
      .createTime
        color: #7f8c8d
        margin: 5px 0 6px 0
    p.content
      font-size: 15px
      margin-bottom: 2px
      font-family: -apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif
      line-height: 1.5
      letter-spacing: 1px
      color: #34495e
    ul.tags
      font-size: 0
      i.icon-tag1
        color: #333
        font-size: 16px
      li
        display: inline-block
        font-size: 14px
        padding: 0 8px
    footer
      margin: -2px 0 10px 0
      a.continue
        font-size: 14px
        color: $green
        
</style>