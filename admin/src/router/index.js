import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index.js'

Vue.use(Router);

//路由懒加载
const Admin = resolve => require(['components/Admin/Admin'], resolve);
const Login = resolve => require(['components/Login/Login'], resolve);
const ArticleEdit = resolve => require(['components/Admin/ArticleEdit/ArticleEdit'], resolve);
const ArticlesManage = resolve => require(['components/Admin/ArticlesManage/ArticlesManage'], resolve);
const Me = resolve => require(['components/Admin/Me/Me'], resolve);
const TagsManage = resolve => require(['components/Admin/TagsManage/TagsManage'], resolve);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/article',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'article',
          component: ArticleEdit,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'list',
          component: ArticlesManage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'tags',
          component: TagsManage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'me',
          component: Me,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect:  '/login'
    }
  ]
});

//在全局导航钩子中检查 meta 字段
router.beforeEach((to, from, next) => {
  let token = store.state.token.token;
  if(to.meta.requiresAuth){
    if(token){
      return next();
    }
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }else{
    next();
  }
});

export default router;
