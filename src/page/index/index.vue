<template>
<div id="index">
  <remote-css href="static/admin/Css/identify.css"></remote-css>
  <remote-css href="static/admin/Css/layout.css"></remote-css>
  <remote-css href="static/admin/Css/account.css"></remote-css>
  <remote-css href="static/admin/Css/style.css"></remote-css>
  <remote-css href="static/admin/Css/control_index.css"></remote-css>
  <remote-script src="static/admin/Js/jquery-1.7.2.min.js"></remote-script>
  <remote-script src="static/admin/Js/haidao.offcial.general.js"></remote-script>
  <remote-script src="static/admin/Js/select.js"></remote-script>
  <remote-script src="static/admin/Js/haidao.validate.js"></remote-script>
  <div class="view-topbar" style="top:0;">
    <div class="topbar-console">
      <div class="tobar-head fl">
        <a href="#" class="topbar-logo fl">
          <span><img src="static/admin/Images/logo.png" width="20" height="20"/></span>
        </a>
        <a href="index.html" class="topbar-home-link topbar-btn text-center fl"><span>管理控制台</span></a>
      </div>
    </div>
    <div class="topbar-info">
      <ul class="fr">
        <li class="fl dropdown topbar-notice topbar-btn">
          <a href="#" class="dropdown-toggle">
            <span class="icon-notice"></span>
            <span class="topbar-num have">0</span>
            <!--have表示有消息，没有消息去掉have-->
          </a>
        </li>
        <li class="fl topbar-info-item">
          <div class="dropdown">
            <a href="#" class="topbar-btn">
              <span class="fl text-normal">帮助与文档</span>
              <span class="icon-arrow-down"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">模板开发手册</a></li>
              <li><a href="#">某某数据字典</a></li>
            </ul>
          </div>
        </li>
        <li class="fl topbar-info-item">
          <div class="dropdown">
            <a href="#" class="topbar-btn">
              <span class="fl text-normal">{{admin[0].username}}</span>
              <span class="icon-arrow-down"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a v-on:click="this.$loginOut">退出</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="view-body">
    <div class="view-sidebar">
      <div class="sidebar-content" >

        <div class="sidebar-nav" v-for="item in navList">
          <div class="sidebar-title">
            <a>
              <span class="icon"><b class="fl icon-arrow-down"></b></span>
              <span class="text-normal">{{item.navModular}}</span>
            </a>
          </div>
          <ul class="sidebar-trans">
            <div v-for="(items,i) in item.pernames">
              <li>
                <a>
                  <router-link :to="{name:item.percodes[i]}" target=_blank>
                    <b class="sidebar-icon"><img v-bind:src="'static/admin/Images/'+i+'.png'" width="16" height="16"/></b>
                    <span class="text-normal">{{items}}</span>
                  </router-link>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="view-product background-color">
      <div class="padding-big background-color">
        <div class="account-info clearfix" v-for="item in admin">
          <div class="text-box-main min-width-300 fl">
            <dl>
              <dt class="padding-big-left lists-border-list clearfix">
                <div class="title fl padding-big-top padding-big-bottom">
                  <p>HI,{{item.username}}</p>
                  <p class="margin-small-top clearfix">
                    <span class="fl">账户安全级别：<em class="text-blue-deep">高</em></span>
                    <!--没有实名认证-->
                    <!-- <a class="button bg-blue-deep icon icon-button-blue fl margin-left" href="#">立即实名认证</a> -->
                    <!--完善个人信息-->
                    <router-link :to="{name:'myself'}" class="button bg-green-deep icon icon-button-green fl margin-left">完善个人信息</router-link>
                  </p>
                </div>
                <span class="fr icon-head">
										<img v-bind:src="item.avatarUrl" alt="账户头像">
									</span>
              </dt>
              <dd class="padding-big clearfix">
                <p class="w50 fl">
                  <i class="fl icon icon-mobile"></i>

                  <span class="fl margin-left">账号：{{item.account}}</span>
                </p>
                <p class="w50 fl">
                  <i class="fl icon icon-email"></i>

                  <span class="fl margin-left" v-if="item.state==1">状态：正常</span>
                  <span class="fl margin-left" v-if="item.state==0">状态：异常</span>
                </p>
              </dd>
            </dl>
          </div>
          <div class="text-box-main min-width-360 fl" >
            <dl>
              <dt class="padding-big lists-border-list clearfix">
                <div class="fl w35">
                  <p>用户数</p>
                  <p class="margin-small-top clearfix">
                    <span ><em class="h3 text-blue-deep">{{item.countUser}} </em>条</span>
                  </p>
                </div>
                <div class="fl w34">
                  <p>通知条数</p>
                  <p class="margin-small-top clearfix">
                    <span><em class="h3 text-red-deep">{{item.countNotice}} </em>条</span>
                  </p>
                </div>
                <div class="fl w35">
                  <p>群总数</p>
                  <p class="margin-small-top clearfix">
                    <span ><em class="h3 text-blue-deep">{{item.countGroup}} </em>条</span>
                  </p>
                </div>
              </dt>
              <dd class="padding-big">
                <div class="account-class text-hidden">
                  <a href="#">禁用账户数<em class="h3 text-red-deep">{{item.countUserBan}}</em></a>
                  <a href="#">禁用通知数<em class="h3 text-red-deep">{{item.countNoticeBan}}</em></a>
                  <a href="#">禁用群数<em class="h3 text-red-deep">{{item.countGroupBan}}</em></a>
<!--                  <a href="#">禁用管理员数<em class="h3 text-red-deep">{{item.countAdminBand}}</em></a>-->
                </div>
              </dd>
            </dl>
          </div>
          <div class="text-box-main min-width-300 fl margin-right-none">
            <dl>
              <dt class="padding-big lists-border-list clearfix">
                <div class="fl title">
                  <p>小程序：通通都走开</p>
                  <p class="text-sliver text-default margin-small-top">
                    <em class="h3 text-golden margin-big-right">联系qq：</em>510288803  欢迎您的体验
                  </p>
                </div>
                <div class="fr">
                  <a class="button btn-orange text-white" href="http://jq.qq.com/?_wv=1027&k=28Xajoq" target="_blank">点击联系</a>
                </div>
              </dt>
              <dd class="padding-big">
                <div class="account-class text-hidden">
                  <p>您好，我是您的联系人：在使用中有任何问题，欢迎随时联系！</p>
                </div>
              </dd>
            </dl>
          </div>
        </div>

        <!--产品-->
        <div class="account-product margin-big-top clearfix">
          <div class="text-box-main padding-big fl mine-product">
            <h2 class="h6 margin-big-bottom">开发人员</h2>
            <div class="mine-product-content clearfix">
              <ul class="w50 fl lists">
                <!-- <li class="w70 lists-border-list">
                  <p class="border-list-text">云托管服务： <em class="orange">0</em>  台
                    <a class="text-main fr" href="#">查看</a>
                  </p>
                </li>  -->
                <li class="w70 lists-border-list">
                  <p class="border-list-text">前端人员： <em class="orange">2</em> 人
                    <a class="text-main fr" href="#">查看</a>
                  </p>
                </li>
                <li class="w70 lists-border-list">
                  <p class="border-list-text">后端人员： <em class="orange">2</em> 人
                    <a class="text-main fr" href="#">查看</a>
                  </p>
                </li>


              </ul>
              <ul class="w50 fl lists">
                <!-- <li class="w80 lists-border-list">
                  <p class="border-list-text">15天内到期的云托管服务： <em class="orange">0</em>  台
                    <a class="text-main fr" href="#">查看</a>
                  </p>
                </li>  -->
                <li class="w70 lists-border-list">
                  <p class="border-list-text">后台前端： <em class="orange">1</em> 人
                    <a class="text-main fr" href="#">查看</a>
                  </p>
                </li>
                <li class="w70 lists-border-list">
                  <p class="border-list-text">后台后端： <em class="orange">2</em> 人
                    <a class="text-main fr" href="#">查看</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="text-box-main padding-big fl w25">
            <h2 class="h6 margin-big-bottom">运用技术</h2>
            <ul class="lists">
              <li class="lists-list"><a href="#">小程序开发</a></li>
              <li class="lists-list"><a href="#">SpringBoot</a></li>
              <li class="lists-list"><a href="#">shiro</a></li>
              <li class="lists-list"><a href="#">SSM</a></li>
              <li class="lists-list"><a href="#">vue</a></li>
              <li class="lists-list"><a href="#">云服务器</a></li>
              <li class="lists-list"><a href="#">云存储对象</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <remote-script src="static/admin/Js/index.js"></remote-script>
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
        name: "index",
        data() {
            return {
                admin: [],
                navList:[]
            }
        },
        created(){
              this.loadAdmin();
        },
        methods:{
            loadAdmin:function () {
                var that = this;
                var admin = JSON.parse(localStorage.getItem("admin"));
                var navList=JSON.parse(localStorage.getItem("navList"));
                that.admin = admin;
                that.navList=navList;
            },

        }
    }


</script>

<style scoped>

</style>
