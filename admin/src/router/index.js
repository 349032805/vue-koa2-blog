import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

//路由懒加载
const Admin = resolve => require(['@/components/Admin/Admin'], resolve);
const Login = resolve => require(['@/components/Login/Login'], resolve);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
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
