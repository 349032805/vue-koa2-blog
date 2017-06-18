<template>
  <div class="articles-list">
    <article v-for="item in articles" class="border-1px">
      <header>
        <h1 class="title"><router-link :to="'/articles/' + item._id" class="hover-underline">{{ item.title }}</router-link></h1>
        <p class="createTime">{{ item.createTime }}</p>
      </header>
      <p class="markdown" v-html="parser(item.abstract || '')"></p>
      <ul class="tags">
        <i class="iconfont icon-tag1"></i>
        <li v-for="tag in item.tags">{{ tag.name }}</li>
      </ul>
      <footer>
        <router-link :to="'/articles/' + item._id" class="continue hover-underline">...read more</router-link>
      </footer>
    </article>
    <p v-show="load" class="load">加载中...</p>
  </div> 
</template>

<script>
import api from '../../api';
import marked from '../../assets/js/marked.js';
import Loading from 'components/Loading/Loading';

export default {
  data(){
    return {
      articles: [],
      page: 1,  //默认加载第一页
      limit: 5, //一次加载五条数据
      pages: -1, //总页数
      load: false,
      end: false   //判断请求是否完成，只有当前请求发送完，才能发送下一个请求
    }
  },
  created(){
     api.getArticlesByPage(this.page, this.limit)
        .then(res => {
          if(res.data.code === 200){
            this.pages = Math.ceil(res.data.total/this.limit);
            this.articles = res.data.data.slice(0);
          }
        })
        .catch(err => {
          console.log('获取文章失败！');
          alert('网络出现问题！');
        });
  },
  mounted(){
    document.addEventListener('scroll', () => {

        let scrollTop = document.body.scrollTop;
        let offsetHeight = document.body.offsetHeight;
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        if(offsetHeight + scrollTop + 5 >= scrollHeight){
          
                if(this.end === false){
                      this.end = true;
                      if(this.page >= this.pages){
                        this.load = false;
                        return;
                      }
                      this.load = true;
                      this.page = this.page + 1;
                      api.getArticlesByPage(this.page, this.limit)
                      .then(res => {
                        if(res.data.code === 200){
                          res.data.data.slice(0).forEach(o => {
                            this.articles.push(o);
                          });
                          this.load = true;
                          this.end = false;
                        }
                      })
                      .catch(err => {
                        console.log('获取文章失败！');
                        alert('网络出现问题！');
                      });
               } 
        }
    });
  },
  methods: {
    //解析markdown
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
    //最后一个artilce的margin要减少
    &:last-child 
      margin-bottom: 0px
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
      margin-top: 4px
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
  p.load
    text-align: center
    color: #ddd
//当屏幕宽度<768px时，间距要适当减小
@media screen and (max-width: 768px)
  .articles-list
    article
      header
        .createTime
          margin: 0
</style>