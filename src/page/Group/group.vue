<template>
  <div id="group">
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
              <h6 class="layout padding-left manage-head-con">群组管理
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
                      <input type="search" placeholder="群id"
                             style="border:solid 1px #00a5e0; height: 25px;width: 100px;" ref="search"
                             v-on:input="searchValue">
                      <a class="button bg-green-deep" v-on:click="resetCurPageSearch(),baseInfo(search)">查询</a>
                    </div>
                  </div>
                </div>
                <div class="tr-th clearfix">
                  <div class="th w35">
                    id
                  </div>
                  <div class="th w35">
                    群名
                  </div>

                  <div class="th w15">
                    状态
                  </div>
                  <div class="th w15">
                    操作
                  </div>
                </div>
                <div class="tr clearfix border-bottom-none" v-for="item in Info.groups">
                  <div class="td w35">
                    {{item.id}}
                  </div>
                  <div class="td w35">
                    {{item.groupName}}
                  </div>

                  <div class="td w15" v-if="item.state==1">
                    正常
                  </div>
                  <div class="td w15" v-if="item.state==0">
                    禁用
                  </div>
                  <div class="td w15">
                    <a class="button btn-red text-white" v-if="item.state==1" v-on:click="shieildGroup(item.id,0)">禁用</a>
                    <a class="button bg-green-deep" v-if="item.state==0" v-on:click="shieildGroup(item.id,1)">启动</a>
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
        name: "group",
        data() {
            return {
                Info: [],
                curPage: 1,
                search: null,
                flag: 0,
                id:0,
                admin:[],
                navList:[]
            }
        },
        mounted() {
            this.baseInfo(null);
            this.loadAdmin();
        },
        methods: {
            pageplus: function () {
                var pageNumber = this.Info.pageNumber;
                var  search=this.search;
                if (pageNumber > this.curPage) {
                    var curPage = this.curPage + 1 //当前页数+1
                    this.curPage = curPage
                    this.baseInfo(search);
                } else {
                    var curPage = 1//返回第一页
                    this.curPage = curPage
                    this.baseInfo(search);
                }
            },
            pagereduce: function () {
                var  search=this.search;
                if (2 <= this.curPage) {
                    var id=this.flag;
                    var flag=this.flag;
                    var curPage = this.curPage - 1 //当前页数-1
                    this.curPage = curPage
                    this.baseInfo(search);
                } else {
                    var pageNumber = this.Info.pageNumber;
                    var curPage = pageNumber//返回最大页
                    this.curPage = curPage
                    this.baseInfo(search);
                }
            },
            //基础信息
            baseInfo: function (id) {
                var that=this;
                var curPage = this.curPage;

                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/queryGroup",
                    data: {
                        curPage:curPage,
                        id:id
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.Info = res.data;
                    console.log(res.data)
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            shieildGroup: function (id, state) {
                var that = this;
                var search=that.search
                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/shieldGroup",
                    data: {
                        id: id,
                        state: state
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    console.log(res.data)
                    that.baseInfo(search);
                }).catch(function (res) {
                    console.log(res);
                    alert("加载失败");
                })
            },
            resetCurPageSearch: function () {
                var that = this;
                that.curPage = 1//重置页数
                that.flag=0;
                that.id=this.$refs.search.value
            },
            resetCurPageOrder: function () {//重置页数
                var that = this;
                that.curPage = 1;
                that.flag=1;
            },
            searchValue: function () {//监听搜索框值的变化
                var id = this.$refs.search.value;
                var that = this;
                that.search = id;
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
