// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import base from "./base";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios=axios
Vue.prototype.$qs = qs
Vue.use(base);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
//路由判断登录
router.beforeEach(function (to,from,next) {
  //判断路由是否需要登录权限
  if(to.meta.requireAuth){
    axios({
      method:"post",
      url:'http://47.102.97.234:9090/isAuth',
      withCredentials: true//防止session失效
    }).then(function (res) {
      var flag=res.data.flag
      if(flag==1){
        next();
      }else {
        alert("您还尚未登录，请登录");
        next({path:'/'});
      }
    }).catch(function (res) {
      console.log(res)
      alert("系统出错");
      next({path:'/'});
    });
  }else {
    next();
  }

})
