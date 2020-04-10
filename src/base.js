import axios from 'axios'
import router from './router'
export default {
  install (Vue, options) {
    Vue.use(router)
    Vue.prototype.$loginOut = function () {
        axios({
        method: "post",
        url: "http://47.102.97.234:9090/loginOut",
        withCredentials: true
      }).then(function (res){
        console.log(res.data)
        if(res.data.flag==1){
          alert("退出成功");
          router.push("/")
        }else if (res.data.flag==0){
          alert("退出失败");
        }
      }).catch(function (res){
        alert("退出失败");
        console.log(res.data)
      })
    }
  }
}


