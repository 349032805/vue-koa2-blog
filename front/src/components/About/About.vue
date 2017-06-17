<template>
  <div class="about-wrapper">
    <v-loading v-show="loading" type="ring"></v-loading>
    <div class="content markdown" v-html="parser(content || '')" v-show="!loading"></div>
  </div>
</template>

<script>
import marked from '../../assets/js/marked';
import Loading from 'components/Loading/Loading';
import api from '../../api';

export default {
  data(){
    return {
      content: '',
      loading: true
    }
  },
  created(){
    //获取个人信息
    api.getMeInfo()
      .then(res => {
        if(res.data.code === 200){
          this.loading = false;
          this.content = res.data.data.content;
        }
      })
      .catch(err => {
        alert('网络出现问题！');
      });
  },
  methods: {
    parser(value){
      return marked(value)
    }
  },
  components: {
    'v-loading': Loading
  }
}
</script>

<style lang="stylus" scoped>
.about-wrapper
  max-width: 700px
  margin: 0 auto
</style>