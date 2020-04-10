<template>
  <div id="choose">
    <remote-css href="static/lib/layui/css/layui.css"></remote-css>
    <remote-css href="static/css/lib.css"></remote-css>
    <remote-css href="static/css/road.css"></remote-css>
    <remote-css href="static/css/choose.css"></remote-css>
    <div class="header">
      <a>
        <div class="home-btn"></div>
      </a>

      <img src="static\images\logo.png" alt="">
      <p>请选择您要登录的系统</p>
    </div>

    <img class="sci-wheel" src="static\images\sci.gif" alt="">

    <div class="center">

      <router-link class="list fn_1 moveUpDownFla1" :to="{name:'login'}"   target=_blank><p>管理员</p></router-link>
      <router-link class="list fn_3 moveUpDownFla1" :to="{name:'superLogin'}" style="margin-left: 34%;"  target=_blank><p>超级管理员</p></router-link>

    </div>

    <!--流星-->
    <div class="liuxing liuxing1 liuxingFla"></div>
    <div class="liuxing liuxing2 liuxingFla2"></div>
    <div class="liuxing liuxing3 liuxingFla3"></div>
    <div class="liuxing liuxing4 liuxingFla4"></div>
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
        name: "choose"
    }
</script>

<style scoped>

</style>
