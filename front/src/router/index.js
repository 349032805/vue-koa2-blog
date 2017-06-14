import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const ArticleList = resolve => require(['components/ArticleList/ArticleList'], resolve);
const Tags = resolve => require(['components/Tags/Tags'], resolve);
const Archives = resolve => require(['components/Archives/Archives'], resolve);
const About = resolve => require(['components/About/About'], resolve);

export default new Router({
  routes: [
    {
      path: '/articles',
      component: ArticleList
    },
    {
      path: '/tags',
      component: Tags
    },
    {
      path: '/archives',
      component: Archives
    },
    {
      path: '/about',
      compoent: About
    }
  ]
})
