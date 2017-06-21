<template>
  <div class="archives-list">
    <v-loading v-show="loading" type="ring"></v-loading>
    <h2 v-show="!loading">归档</h2>
    <div class="archives-content" v-for="(item, key, index) in archives" v-show="!loading">
      <h3>{{ key }} ({{ item.length }})</h3>
      <ul>
        <li v-for="article in item">
          <router-link :to="'/articles/' + article._id" class="hover-underline">{{ article.title }}</router-link><span class="createTime">{{ article.createTime }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../api';
import Loading from 'components/Loading/Loading';
export default {
  data(){
    return {
      archives: {},
      loading: true
    }
  },
  created(){
    api.getAllArticles()
      .then(res => {
        if(res.data.code === 200){
          let data = res.data.data;
          //根据article.createTime这个字段进行归档，最后返回一个对象{ "2017年六月": [], "2017年五月": [] }
          let archives = data.reduce((prev, curr) => {
            let time = curr.createTime.slice(0, 7).replace(' ', '年');
            if(typeof prev[time] === 'undefined'){
              prev[time] = [curr];
            }else{
              prev[time].push(curr)
            }
            return prev;
          }, {});
           this.loading = false;
           this.archives = archives;
        }
      })
      .catch(err => {
        console.log('获取文章失败！');
        alert('网络出现问题！');
      });
  },
  components: {
    'v-loading': Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting.styl';
.archives-list
  max-width: 850px
  margin: 0 auto
  padding: 15px
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
       a
        color: $green
       span.createTime
        padding-left: 10px
        color: $light
        font-size: 14px
        font-style: italic
@media screen and (max-width: 480px)
  .archives-list
    h2
      font-size: 20px
      margin-bottom: 10px
    div.archives-content
      ul 
        padding: 3px
        margin-bottom: 10px
        li
          margin: 0 0 0 20px
</style>