import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//路由懒加载
const Admin = resolve => require(['components/Admin/Admin'], resolve);
const Login = resolve => require(['components/Login/Login'], resolve);
import Article from 'components/Article/Article';
import Tags from 'components/Tags/Tags';
import Me from 'components/Me/Me';
import ArticleManage from 'components/ArticleManage/ArticleManage';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      component: Admin,
      // meta: {
      //   requiresAuth: true
      // }
      children: [
        {
          path: 'article',
          component: Article
        },
        {
          path: 'list',
          component: ArticleManage
        },
        {
          path: 'tags',
          component: Tags
        },
        {
          path: 'me',
          component: Me
        }
      ]
    },
    {
      path: '/admin/login',
      component: Login
    },
    {
      path: '*',
      redirect:  '/admin/login'
    }
  ]
});

//在全局导航钩子中检查 meta 字段
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if(false){    //vuexY

    }
    next({
      path: '/admin/login',
      query: { redirect: to.fullPath }
    })
  }else{
    next();
  }
});

export default router;
