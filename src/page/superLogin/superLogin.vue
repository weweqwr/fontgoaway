<template>
  <div id="superLogin">
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
            <h1>欢迎您登录</h1>
            <form class="layui-form" action="index.html" method="post">
              <!-- 用户名 -->
              <input class="verify" type="text" name="" value="" placeholder="用户名" ref="account">
              <!-- 密码 -->
              <input class="verify" type="password" name="" value="" placeholder="密码" ref="password">

              <!-- 记住密码 -->
              <div class="remb-pass">
                <div class="layui-input-block">
                  <input type="checkbox" name="like1[write]" lay-skin="primary" title="记住密码" checked="">
                </div>
              </div>
            </form>
            <div class="login_fields__submit">
              <input class="layui-btn layui-btn-normal submit" type='submit' value='登录' v-on:click="superlogin">
            </div>
          </div>

          <div class="success">
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

        <p class="title">超级管理员登录</p>
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
        name: "superLogin",
        data() {
            return {
                state: [],
                infos: [],
                navList: []
            }
        },
        created() {
        },
        methods: {
            superlogin: function () {
                var that = this;
                var account = that.$refs.account.value;
                var password = that.$refs.password.value;
                setTimeout(function () {
                    $('.success').fadeIn();
                }, 3200);
                if (account != "" && password != "") {

                    that.$axios({
                        method: "POST",
                        url: "http://47.102.97.234:9090/superLogin",
                        data: {
                            account: account,
                            password: password
                        },
                        withCredentials: true//防止session失效
                    }).then(function (res) {
                        var info = res.data
                        if (info.flag == 1) {
                            that.state = "登录成功！";
                            that.infos = "正在进入系统...";
                            that.queryAdminInfo(account);
                            that.queryNav(account);
                            setTimeout(function () {
                                that.$router.push("/index");
                            }, 4000);
                        } else if (info.flag == 0) {
                            that.state = "登录失败！";
                            that.infos = "请重新登录";
                            setTimeout(function () {
                                that.$router.go(0);
                            }, 4000);
                        } else if (info.flag == 3) {
                            that.state = "您不是超级管理员！";
                            that.infos = "无权限登录！";
                            setTimeout(function () {
                                that.$router.go(0);
                            }, 4000);
                        } else if (info.flag == 4) {
                            that.state = "尚在认证中";
                            that.infos = "你的账号未通过超级管理员认证！！";
                            setTimeout(function () {
                                that.$router.go(0);
                            }, 4000);
                        }
                    }).catch(function (res) {
                        that.state = "登录失败！";
                        that.infos = "请重新登录";
                        setTimeout(function () {
                            that.$router.go(0);
                        }, 4000);
                    });
                } else {
                    that.state = "账号密码不能为空！";
                    that.infos = "请重新注册！";
                    setTimeout(function () {
                        that.$router.go(0);
                    }, 4000);
                }
            },
            queryAdminInfo: function (account) {
                var that = this;
                that.$axios({
                    method: "POST",
                    url: "http://47.102.97.234:9090/queryAdminInfo",
                    data: {
                        account: account,
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    localStorage['admin'] = JSON.stringify(res.data.admin)
                }).catch(function (res) {
                    alert("载入信息失败");
                });
            },
            //查询该用户拥有的权限，显示导航栏
            queryNav: function (account) {
                var that = this;
                that.$axios({
                    method: "POST",
                    url: "http://47.102.97.234:9090/queryPermissionNav",
                    data: {
                        account: account,
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    console.log(res.data.navList)
                    localStorage['navList'] = JSON.stringify(res.data.navList)
                }).catch(function (res) {
                    alert("载入信息失败");
                });
            }

        }
    }
</script>

<style scoped>

</style>
