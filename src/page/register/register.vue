<template>
  <div id="register">
    <remote-css href="static\lib\layui\css\layui.css"></remote-css>
    <remote-css href="static\css\lib.css"></remote-css>
    <remote-css href="static\css\login.css"></remote-css>
    <remote-css href="static\css\road.css"></remote-css>
    <remote-script src="static/js/jquery.min.js"></remote-script>
    <remote-script src="static/js/jquery-ui.min.js"></remote-script>
    <remote-script src="static/js/login.js"></remote-script>
    <div class="login-container">
      <!-- 左内容 -->
      <div class="left-container">
        <div class="login">
          <div class="login-content">
            <h1>注册</h1>
            <form class="layui-form" action="index.html" method="post">
              <!-- 用户名 -->
              <input class="verify" type="text" placeholder="用户名" ref="account">
              <!-- 密码 -->
              <input class="verify" type="password" placeholder="密码" ref="password">
              <!--重新输入密码-->
              <input class="verify" type="password" placeholder="重新输入密码" ref="repassword">
              <!-- 记住密码 -->
              <div class="remb-pass">
                <div class="layui-input-block">
                  <input type="checkbox" name="like1[write]" lay-skin="primary" title="记住密码" checked="">
                </div>
              </div>
            </form>

            <div class="login_fields__submit">
              <input class="layui-btn layui-btn-normal submit" type='submit' value='注册' v-on:click="register">
            </div>
            <router-link class="goRegister" :to="{name:'login'}" target=_blank>登录</router-link>
          </div>

          <div class="success" v-if="">
            <h2 class="i-green">{{state}}</h2>
            <p>{{infos}}</p>
          </div>


        </div>

        <!-- 认证中 -->
        <div class="authent">
          <img src="static\images\login\puff.svg">
          <p>认证中...</p>
        </div>
      </div>

      <!-- 右内容 -->
      <div class="right-container">
        <!--流星-->
        <div class="liuxing liuxing1 liuxingFla"></div>
        <div class="liuxing liuxing2 liuxingFla2"></div>
        <div class="liuxing liuxing3 liuxingFla3"></div>
        <div class="liuxing liuxing4 liuxingFla4"></div>

        <p class="title">注册管理员</p>
        <!-- <img src="images\login_bg_1.png" alt=""> -->
      </div>
    </div>

    <img class="footer_bg" src="static\images\footer_bg.png" alt="">
  </div>
</template>

<script>
    export default {
        components: {
            'remote-css': {
                render(createElement) {
                    return createElement('link', {attrs: {rel: 'stylesheet', href: this.href}});
                },
                props: {
                    href: {type: String, required: true},
                },
            },
            'remote-script': {
                render(createElement) {
                    return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
                },
                props: {
                    src: {type: String, required: true},
                },
            }
        },
        name: "register",
        data() {
            return {
                state:[],
                infos:[],
                admin:[]
            }
        },
        created() {

        },
        methods: {
            register: function () {
                var that = this;
                var account = that.$refs.account.value;
                var password = that.$refs.password.value;
                var repassword = that.$refs.repassword.value;
                setTimeout(function () {
                    $('.success').fadeIn();
                }, 3200);
                if (account != "" && password != "" && repassword != "") {
                    if (repassword == password) {
                        that.$axios({
                            method: "POST",
                            url: "http://47.102.97.234:9090/doRegister",
                            data: {
                                account: account,
                                password: password
                            },
                            withCredentials: true//防止session失效
                        }).then(function (res) {
                            console.log(res)
                            var info = res.data;
                            if (info.flag == 1) {
                                that.state="注册成功！";
                                that.infos="正在前往登录页面...";
                                setTimeout(function () {
                                    that.$router.push("/");
                                }, 4000);
                            } else if (info.flag == 2) {
                                that.state="以有该账号！";
                                that.infos="请重新注册！";
                                setTimeout(function () {
                                    that.$router.go(0);
                                }, 4000);
                            } else if (info.flag == 0) {
                                that.state="注册失败！";
                                that.infos="请重新注册！";
                                setTimeout(function () {
                                    that.$router.go(0);
                                }, 4000);
                            }
                        }).catch(function (res) {
                            that.state="注册失败！";
                            that.infos="请重新注册！";
                            setTimeout(function () {
                                that.$router.go(0);
                            }, 4000);
                        });
                    } else {
                        that.state="密码不一致！";
                        that.infos="请重新注册！";
                        setTimeout(function () {
                            that.$router.go(0);
                        }, 4000);
                    }
                }else{
                    that.state="账号密码不能为空！";
                    that.infos="请重新注册！";
                    setTimeout(function () {
                        that.$router.go(0);
                    }, 4000);
                }
            }

        }
    }
</script>

<style scoped>

</style>
