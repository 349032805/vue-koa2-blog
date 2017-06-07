// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

//全局css
import 'assets/stylus/index.styl';

//引入Message组件,挂载到原型上
import Message from 'components/Message';
Vue.prototype.$message = (options) => {
  return new Message(options);
};
//引入Confirm组件，挂载到原型上
import Confirm from 'components/Confirm';
Vue.prototype.$confirm = (message, title, options) => {
  return new Confirm(message, title, options);
};

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
