<template>
  <div>
    <div class="content markdown" v-html="parser(content || '')"></div>
  </div>
</template>

<script>
import marked from '../../assets/js/marked';
import api from '../../api';

export default {
  data(){
    return {
      content: ''
    }
  },
  created(){
    api.getMeInfo()
      .then(res => {
        if(res.data.code === 200){
          this.content = res.data.data.content;
        }
      })
      .catch(err => {

      });
  },
  methods: {
    parser(value){
      return marked(value)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>