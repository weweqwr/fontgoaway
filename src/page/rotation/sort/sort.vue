<template>
  <div id="sort">
    <remote-css href="static/admin/Css/identify.css"></remote-css>
    <remote-css href="static/admin/Css/layout.css"></remote-css>
    <remote-css href="static/admin/Css/account.css"></remote-css>
    <remote-css href="static/admin/Css/style.css"></remote-css>
    <remote-css href="static/admin/Css/control_index.css"></remote-css>
    <remote-script src="static/admin/Js/jquery-1.7.2.min.js"></remote-script>
    <remote-script src="static/admin/Js/haidao.offcial.general.js"></remote-script>
    <remote-script src="static/admin/Js/select.js"></remote-script>
    <remote-script src="static/admin/Js/haidao.validate.js"></remote-script>
    <remote-script src="static/admin/Js/index.js"></remote-script>
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
      <div class="view-product">
        <div class="authority">
          <div class="authority-head">
            <div class="manage-head">
              <h6 class="layout padding-left manage-head-con">轮播排序
                <span class="fr text-small text-normal padding-top">发布时间：2020-04-05</span>
                <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">2.4.0.160708</em></span>
              </h6>
            </div>
          </div>
          <div class="authority-content">
            <div class="list-content show">
              <div class="offcial-table tr-border margin-big-top clearfix">
                <div class="tr-th clearfix">
                  <div id="controller" style="width: 100%;">
                    <div class="fr" style="padding-left: 5px;">
                      <input type="text" value="1" style="display: none;" ref="flag">
                      <a class="button btn-red text-white" v-on:click="move()">提交</a>
                    </div>
                  </div>
                </div>
                <div class="tr-th clearfix">
                  <div class="th w20">
                    通知id
                  </div>
                  <div class="th w20">
                    图片链接
                  </div>
                  <div class="th w15">
                    发起管理员
                  </div>
                  <div class="th w15">
                    创建的时间
                  </div>
                  <div class="th w15">
                    状态
                  </div>
                  <div class="th w15">
                    排序号
                  </div>
                </div>
                <div class="tr clearfix border-bottom-none" v-for="item in Info.infoList">
                  <div class="td w20">
                    {{item.id}}
                  </div>
                  <div class="td w20">
                    <img v-bind:src="item.imageUrl" style="width: 100px;height: 50px;">
                  </div>
                  <div class="td w15">
                    {{item.originator}}
                  </div>
                  <div class="td w15">
                    {{item.createTime}}
                  </div>
                  <div class="td w15" v-if="item.state==1">
                    正常
                  </div>
                  <div class="td w15" v-if="item.state==0">
                    禁用
                  </div>
                  <div class="td w15">
                    <input type="text" v-model="item.id" style="display: none;" ref="id"/>
                    <input type="text" v-model="item.orderId" style="width: 50px;border:1px solid #9F9F9F;"
                           ref="orderId"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="show-page padding-big-right">
              <div class="page">
                <div class="page">
                  <ul class="offcial-page margin-top margin-big-right">
                    <li>共<em class="margin-small-left margin-small-right">{{Info.count}}</em>条数据</li>
                    <input type="text" v-model="curPage" ref="page" style="display: none;"/>
                    <li>第<em class="margin-small-left margin-small-right">{{curPage}}</em>页</li>
                    <li><a class="next disable" v-on:click="pagereduce">上一页</a></li>
                    <li></li>
                    <li><a class="next disable" v-on:click="pageplus">下一页</a></li>
                    <li><span class="fl">共<em
                      class="margin-small-left margin-small-right">{{Info.pageNumber}}</em>页</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        name: "sort",
        data() {
            return {
                Info: [],
                curPage: 1,
                admin:[],
                navList:[]
            }
        },
        created() {
            this.baseInfo();
            this.loadAdmin();
        },
        methods: {
            pageplus: function () {
                var pageNumber = this.Info.pageNumber;

                if (pageNumber > this.curPage) {
                    var curPage = this.curPage + 1 //当前页数+1
                    this.curPage = curPage
                    this.baseInfo();
                } else {
                    var curPage = 1//返回第一页
                    this.curPage = curPage
                    this.baseInfo();
                }
            },
            pagereduce: function () {
                if (2 <= this.curPage) {
                    var curPage = this.curPage - 1 //当前页数-1
                    this.curPage = curPage
                    this.baseInfo();
                } else {
                    var pageNumber = this.Info.pageNumber;
                    var curPage = pageNumber//返回最大页
                    this.curPage = curPage
                    this.baseInfo();
                }
            },
            baseInfo: function () {
                var that = this;
                var curPage = this.curPage;
                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/queryRotationMini",
                    data: {
                        curPage: curPage
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.Info = res.data;
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            move: function () {
                var that = this;
                var orderIds = that.$refs.orderId
                var orderId = [];
                var ids = that.$refs.id
                for (var i = 0; i < orderIds.length; i++) {
                    orderId.push(orderIds[i].value);
                }
                var ids = that.$refs.id
                var id = []
                for (var i = 0; i < ids.length; i++) {
                    id.push(ids[i].value)
                }
                let param = new FormData();
                param.append("orderId",orderId);
                param.append("id",id);
                console.log(orderId)
                console.log(id)
                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/orderRotationById",
                    data:param,
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    if(res.data.flag==1){
                        alert("排序成功")
                    }else{
                        alert("排序失败")
                    }
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            loadAdmin:function () {
                var that = this;
                var admin = JSON.parse(localStorage.getItem("admin"));
                var navList=JSON.parse(localStorage.getItem("navList"));
                that.admin = admin;
                that.navList=navList;
            }


        }
    }
</script>

<style scoped>

</style>
