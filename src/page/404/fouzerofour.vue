<template>
  <div id="fouzerofour">
    <remote-css href="https://fonts.googleapis.com/css?family=Righteous&display=swap"></remote-css>
   <remote-css href="static/404/css/style.css"></remote-css>
    <div class="moon"></div>
    <div class="moon__crater moon__crater1"></div>
    <div class="moon__crater moon__crater2"></div>
    <div class="moon__crater moon__crater3"></div>

    <div class="star star1"></div>
    <div class="star star2"></div>
    <div class="star star3"></div>
    <div class="star star4"></div>
    <div class="star star5"></div>

    <div class="error">
      <div class="error__title">404</div>
      <div class="error__subtitle">Hmmm...</div>
      <div class="error__description">这个网页还未开发好请稍等....</div>

      <router-link :to="{name:'/'}" target=_blank class="error__button error__button--active">返回首页</router-link>

    </div>

    <div class="astronaut">
      <div class="astronaut__backpack"></div>
      <div class="astronaut__body"></div>
      <div class="astronaut__body__chest"></div>
      <div class="astronaut__arm-left1"></div>
      <div class="astronaut__arm-left2"></div>
      <div class="astronaut__arm-right1"></div>
      <div class="astronaut__arm-right2"></div>
      <div class="astronaut__arm-thumb-left"></div>
      <div class="astronaut__arm-thumb-right"></div>
      <div class="astronaut__leg-left"></div>
      <div class="astronaut__leg-right"></div>
      <div class="astronaut__foot-left"></div>
      <div class="astronaut__foot-right"></div>
      <div class="astronaut__wrist-left"></div>
      <div class="astronaut__wrist-right"></div>

      <div class="astronaut__cord">
        <canvas id="cord" height="500px" width="500px"></canvas>
      </div>

      <div class="astronaut__head">
        <canvas id="visor" width="60px" height="60px"></canvas>
        <div class="astronaut__head-visor-flare1"></div>
        <div class="astronaut__head-visor-flare2"></div>
      </div>
    </div>
    <remote-script src="static/404/js/script.js"></remote-script>
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
        name: "fouzerofour"
    }
</script>

<style scoped>

</style>
