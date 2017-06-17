<template>
  <div class="tags-list">
    <v-loading v-show="loading" type="ring"></v-loading>
    <div class="tags-wrapper" v-show="!loading">
      <h2 class="title">所有标签</h2>
      <ul class="tags">
        <li v-for="tag in tags" class="tag"><a href="javascript:;" @click="scrollTo(tag._id)" class="hover-underline">{{ tag.name }}</a></li>
      </ul>
    </div>
    <div class="tags-article" v-for="item in tagArticle" :id="item.id" v-show="!loading">
      <h3 class="title">{{ item.name }}</h3>
      <ul class="articles">
        <li v-for="article in item['articles']" class="article">
          <router-link :to="'/articles/' + article._id"><span class="title hover-underline">{{ article.title }}</span></router-link>
          <span class="createTime">{{ article.createTime | formatDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../api';
import Loading from 'components/Loading/Loading';
//滚动组件
import VueScrollTo from 'Vue-scrollto';

export default {
  data(){
    return {
      tags: [],
      tagArticle: [],
      loading: true
    }
  },
  filters: {
    formatDate(value){
      return value.slice(0, 11);
    }
  },
  created(){
    //先获取所有标签，再根据所有标签获取文章
    api.getAllTags()
      .then(res => {
        if(res.data.code === 200){
          let tags = res.data.data.slice(0);
          this.tags = tags;
          this.loading = false;
          tags.forEach((o) => {
            api.getArticleByTagId(o._id)
              .then(res => {
                if(res.data.code === 200){
                  let obj = {};
                  obj.name = o.name;
                  obj.id = o._id;
                  obj.articles = res.data.data;
                  this.tagArticle.push(obj);
                }
              })
              .catch(err => {
                console.log('根据标签获取文章失败！');
                alert('网络出现问题！');
              });
          });
        }
      })
      .catch(err => {
        console.log('获取所有标签错误！');
        alert('网络出现问题！');
      });
  },
  methods: {
    //滚动到某处
    scrollTo(id){
      let obj = document.getElementById(id);
      VueScrollTo.scrollTo(obj);
    }
  },
  components: {
    'v-loading': Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease
.fade-enter, .fade-leave-to
  opacity: 0
.tags-list
  max-width: 850px
  margin: 0 auto
  padding: 15px
  //列出所有标签部分
  .tags-wrapper
    .title
      font-size: 22px
      font-weight: 700
    .tags
      font-size: 0
      .tag
        display: inline-block
        padding: 15px 10px 0 0
        a
          font-size: 20px
          font-weight: 700
          color: $green
  //列出标签对应的文章
  .tags-article
    margin: 18px 0
    h3.title
      position: relative
      font-size: 20px
      &::before 
          position: absolute
          content: "#\0000a0"
          color: $green
          top: 0px 
          left: -0.9em
    .articles
      padding: 5px
      .article
        font-weight: 700
        list-style: disc
        margin: 20px
       span.title
        color: $green
       span.createTime
        color: $light
        font-size: 14px
        font-style: italic
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