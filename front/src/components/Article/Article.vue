<template>
  <div class="article-warpper">
      <article class="article">
        <header>
          <h1 class="title">{{ article.title }}</h1>
          <ul class="tags">
            <i class="iconfont icon-tag1"></i>
            <li v-for="tag in article.tags">{{ tag.name }}</li>
          </ul>
        </header>
        <p v-html="parser(article.content || '')" class="markdown"  ref="articleContent"></p>
        <footer>
          <p>发表于 <span class="createTime">{{ article.createTime }}</span> ,最后修改于 <span class="lastEditTime">{{ article.lastEditTime }}</span></p>
        </footer>
      </article>
      <aside class="catalog">
        目录
        <ul>
          <li v-for="item in catalog" :class="item.tagName"><a :href="item.href">{{ item.text }}</a></li>
        </ul>
      </aside>
  </div>
</template>

<script>
import api from '../../api';
import marked from '../../assets/js/marked';

export default {
  data(){
    return {
      article: {},
      catalog: []
    }
  },
  watch: {
    '$route'(to, from){
      let path = from.path;
      if(path === '/articles' || path === '/tags' || path === '/archives'){
        if(to.params.id){
          api.getArticleById(to.params.id)
            .then(res => {
              this.article = res.data.data;
              this.catalog = [];
              this.$nextTick(() => {
                Array.from(this.$refs['articleContent'].querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((item, i) => {
                  item.id = item.localName + '-' + i
                  this.catalog.push({
                    tagName: item.localName,
                    text: item.innerText,
                    href: '#' + item.localName + '-' + i
                  });
                });
              });
            })
            .catch(err => {
              this.$router.push({
                path: '/articles'
              })
            });

        }
      }
    }
  },
  created(){
    // console.log(this.$route.params.id);
    api.getArticleById(this.$route.params.id)
      .then(res => {
        this.article = res.data.data;
        this.$nextTick(() => {
          Array.from(this.$refs['articleContent'].querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((item, i) => {
            item.id = item.localName + '-' + i
            this.catalog.push({
              tagName: item.localName,
              text: item.innerText,
              href: '#' + item.localName + '-' + i
            });
          });
        });
      })
      .catch(err => {
        this.$router.push({
          path: '/articles'
        })
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
.article-warpper
  .article
    margin-right: 230px
    margin-bottom: 30px
    header
      .title
        font-size: 2em
        margin-bottom: 0.8em
      ul.tags
        font-size: 0
        margin-bottom: 20px
        i.icon-tag1
          color: #333
          font-size: 16px
        li
          display: inline-block
          font-size: 14px
          padding: 0 8px
    footer
      margin-top: 30px
      .createTime, .lastEditTime
        font-style: italic
        font-size: 14px
        border-bottom: 1px dashed $green
  .catalog
    position: fixed
    width: 220px
    top: 110px
    bottom: 0
    left: 50%
    margin-left: 270px
    ul
      li.h1
        margin-left: 0
        list-style-type: disc
      li.h2
        margin-left: 0.7em
        list-style-type: circle
      li.h3
        margin-left: 1.4em
        list-style-type: square
      li.h4
        margin-left: 2.1em
        list-style-type: disc
      li.h5
        margin-left: 2.8em
        list-style-type: circle
      li.h6
        margin-left: 3.5em
        list-style-type: square
</style>