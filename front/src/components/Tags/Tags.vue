<template>
  <div class="tags-list">
    <div class="tags-wrapper">
      <h2>All Tags</h2>
      <ul>
        <li v-for="tag in tags"><a href="javascript:;" @click="scrollTo(tag._id)">{{ tag.name }}</a></li>
      </ul>
    </div>
    <div class="tags-article" v-for="item in tagArticle" :id="item.id">
      <h3>{{ item.name }}</h3>
      <ul>
        <li v-for="article in item['articles']">
          <router-link :to="'/articles/' + article._id"><span class="title">{{ article.title }}</span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../api';
import VueScrollTo from 'Vue-scrollto';

export default {
  data(){
    return {
      tags: [],
      tagArticle: []
    }
  },
  created(){
    api.getAllTags()
      .then(res => {
        if(res.data.code === 200){
          let tags = res.data.data.slice(0);
          this.tags = tags;
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
              });
          });
        }
      })
      .catch(err => {
        console.log('获取所有标签错误！');
      });
  },
  methods: {
    scrollTo(id){
      let obj = document.getElementById(id);
      VueScrollTo.scrollTo(obj);
    }
  }
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