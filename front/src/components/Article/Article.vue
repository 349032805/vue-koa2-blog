<template>
  <div class="article-warpper"  :class="{ 'noCatalog': !hasCatalog }">
      <v-loading type="ring" v-show="loading"></v-loading>
      <article class="article" v-show="!loading">
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
      <aside class="catalog" v-if="hasCatalog" v-show="!loading">
        <h3 class="catalog-title" @click="scrollToTop" title="返回顶部">文章目录<i class="iconfont icon-top"></i></h3>
        <div class="catalog-wrapper">
          <ul class="catalog-list">
            <li v-for="item in catalog" :class="item.tagName" class="catalog-li"><a href="javascript:;" @click="scrollTo(item.href)">{{ item.text }}</a></li>
          </ul>
        </div>
      </aside>
  </div>
</template>

<script>
import api from '../../api';
import marked from '../../assets/js/marked';
import Loading from 'components/Loading/Loading';
//滚动组件
import VueScrollTo from 'Vue-scrollto';

export default {
  data(){
    return {
      article: {},
      catalog: [],
      hasCatalog: false,  //这个变量有来判断该文章有没有目录
      loading: true
    }
  },
  watch: {
    '$route'(to, from){
      let path = from.path;
      if(path === '/articles' || path === '/tags' || path === '/archives'){
        if(to.params.id){
         this.loading = true;
         this.catalog = [];
         this.article = {};
          api.getArticleById(to.params.id)
            .then(res => {
              if(res.data.code === 200){
                this.loading = false;
                this.article = res.data.data;
                this.$nextTick(() => {
                  this.createCatalog();
                });
              }
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
    api.getArticleById(this.$route.params.id)
      .then(res => {
        if(res.data.code === 200){
          this.loading = false;
          this.article = res.data.data;
          this.$nextTick(() => {
            this.createCatalog();
          });
        }
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
    },
    //生成目录
    createCatalog(){
      let nodeList = this.$refs['articleContent'].querySelectorAll('h1, h2, h3, h4, h5, h6');
      if(nodeList.length === 0){
        this.hasCatalog = false;
        return;
      }
      this.hasCatalog = true;
      Array.from(this.$refs['articleContent'].querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((item, i) => {
        item.id = item.localName + '-' + i; //给标签设置id
        this.catalog.push({
          tagName: item.localName,
          text: item.innerText,
          href: item.localName + '-' + i     //href为上面所设置的id
        });
      });
    },
    //滚动到指定标题
    scrollTo(id){
      let obj = document.getElementById(id);
      VueScrollTo.scrollTo(obj, {
        onDone: function(){
          obj.style.transform = 'scale(1.2)';
          obj.style.webkitTransform = 'scale(1.2)';
          obj.style.transition = 'all .5s';
          obj.style.webkitTransition = 'all .5s';
          obj.addEventListener('transitionend', function(){
            this.style = '';
          })
        }
      });
    },
    //返回顶部
    scrollToTop(){
      VueScrollTo.scrollTo('#app');
    }
  },
  components: {
    'v-loading': Loading
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
        word-wrap:break-word;
        white-space: pre-wrap;
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
    box-shadow: 0px 1px 1px #7D7D7D
    position: fixed
    width: 220px
    top: 110px
    left: 50%
    margin-left: 270px
    .catalog-title
      cursor: pointer
      font-size: 18px
      text-align: center
      padding: 5px 0
      border-bottom: 1px dashed #ddd
    .catalog-wrapper
      padding: 5px 0
      max-height: 400px
      padding-left: 20px
      overflow-y: auto
      ul.catalog-list
        font-size: 14px
        color: #bfbfbf
        .catalog-li
          a
            color: #333
            &:hover
              color: $green
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
.noCatalog
  max-width: 750px
  margin: 0 auto
  .article
    margin-right: 0
@media screen and (max-width: 950px)
  .article-warpper
    .article
      margin-right: 210px
    .catalog
      margin-left: 250px
@media screen and (max-width: 876px)
  .article-warpper
    .article
      margin-right: 180x
    .catalog
      margin-left: 210px
@media screen and (max-width: 768px)
  .article-warpper
    .article
      margin-right: 0
    .catalog
      display: none
</style>