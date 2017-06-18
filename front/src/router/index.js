import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);          

const ArticleList = resolve => require(['components/ArticleList/ArticleList'], resolve);
const Tags = resolve => require(['components/Tags/Tags'], resolve);
const Archives = resolve => require(['components/Archives/Archives'], resolve);
const About = resolve => require(['components/About/About'], resolve);
const Article = resolve => require(['components/Article/Article'], resolve);

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    if(to.meta.scrollTop === true){
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/articles',
      component: ArticleList
    },
    {
      path: '/articles/:id',
      component: Article,
      meta: { scrollTop: true }      //该路由必须滚动到顶部
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
      component: About
    },
    {
      path: '*',
      redirect: '/articles'
    }
  ]
});

export default router;
