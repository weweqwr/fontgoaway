<template>
  <div id="RoleAdmin">
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
              <h6 class="layout padding-left manage-head-con">角色管理
                <span class="fr text-small text-normal padding-top">发布时间：2020-04-05</span>
                <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">2.4.0.160708</em></span>
              </h6>
            </div>
          </div>
          <div class="authority-content">
            <div class="list-content show">
              <div class="offcial-table tr-border margin-big-top clearfix">
                <!--                <div class="tr-th clearfix">-->
                <!--                  <div id="controller" style="width: 100%;">-->

                <!--                    <div class="fr" style="padding-left: 5px;">-->
                <!--                      <a class="button btn-orange text-white" target="_blank" v-on:click="addRole()">添加角色</a>-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                </div>-->
                <div class="tr-th clearfix">
                  <div class="th w20">
                    id
                  </div>
                  <div class="th w20">
                    账号
                  </div>
                  <div class="th w15">
                    头像:
                  </div>
                  <div class="th w30">
                    拥有角色:
                  </div>

                  <div class="th w15">
                    操作
                  </div>
                </div>
                <div class="tr clearfix border-bottom-none" v-for="item in Info.admins">
                  <div class="td w20">
                    {{item.id}}
                  </div>
                  <div class="td w20">
                    {{item.account}}
                  </div>
                  <div class="td w15">
                    <img v-bind:src="item.avatarUrl" style="width: 50px;height: 50px;">
                  </div>
                  <div class="td w30">
                    <div v-for="(rolenames,i) in item.rolenames">
                      {{rolenames}}
                      <a class="button-word2 btn_ajax_confirm" v-if="flag==0 && item.rolenames.length>1"
                         v-on:click="deleteAdminRole(item.account,item.roleIds[i])">删除</a>
                      <a class="button-word2 btn_ajax_confirm" v-if="flag==1"
                         v-on:click="addAdminRole(item.account,item.roleIds[i])">添加</a>
                    </div>
                  </div>

                  <div class="td w15">
                    <a class="button btn-red text-white" v-if="item.state==1"
                       v-on:click="handleRoleState(item.roleId,0)">禁用</a>
                    <a class="button bg-green-deep" v-if="item.state==0"
                       v-on:click="handleRoleState(item.roleId,1)">启动</a>
                    <a class="button btn-orange text-white" target="_blank"
                       v-on:click="resetCurPage(),baseInfo(item.account)">添加</a>
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
        name: "RoleAdmin",
        data() {
            return {
                Info: [],
                curPage: 1,
                search: null,
                flag: 0,
                id: 0,
                i: 0,
                admin: [],
                navList:[]

            }
        },
        created() {
            this.baseInfo(null);
            this.loadAdmin();
        },
        methods: {
            pageplus: function () {
                var search = this.search;
                var pageNumber = this.Info.pageNumber;
                if (pageNumber > this.curPage) {
                    var curPage = this.curPage + 1 //当前页数+1
                    this.curPage = curPage
                    this.baseInfo(null);
                } else {
                    var curPage = 1//返回第一页
                    this.curPage = curPage
                    this.baseInfo(null);
                }
            },
            pagereduce: function () {
                var search = this.search;
                if (2 <= this.curPage) {
                    var curPage = this.curPage - 1 //当前页数-1
                    this.curPage = curPage
                    this.baseInfo(null);
                } else {
                    var pageNumber = this.Info.pageNumber;
                    var curPage = pageNumber//返回最大页
                    this.curPage = curPage
                    this.baseInfo(null);
                }
            },
            baseInfo: function (account) {
                var that = this;
                var curPage = that.curPage;
                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/queryAdminRole",
                    data: {
                        curPage: curPage,
                        account: account
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.Info = res.data;
                    console.log(res.data);
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },

            searchValue: function () {//监听搜索框值的变化
                var id = this.$refs.search.value;
                var that = this;
                that.search = id;
            },
            handleRoleState: function (id, state) {
                var that = this;
                var roleId = id;
                var state = state;
                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/handleRoleState",
                    data: {
                        roleId: roleId,
                        state: state
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.baseInfo();
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            deleteRolePermissionByRoleId: function (roleId, perId) {
                var that = this;
                var roleId = roleId;
                var perId = perId;
                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/deleteRolePermissionByRoleId",
                    data: {
                        roleId: roleId,
                        perId: perId
                    }
                    ,
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.baseInfo();
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            resetCurPage: function () {
                var that = this;
                that.curPage = 1;
                that.flag = 1;
            },
            addAdminRole: function (account, roleId) {
                var that = this;

                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/addAdminRole",
                    data: {
                        account: account,
                        roleId: roleId
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.baseInfo(account);
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            deleteAdminRole: function (account, roleId) {
                var that = this;

                that.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/deleteAdminRole",
                    data: {
                        account: account,
                        roleId: roleId
                    },
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    that.baseInfo(null);
                }).catch(function (res) {
                    console.log("res");
                    alert("加载失败");
                })
            },
            addRole: function () {
                var rolename = prompt("请输入要添加的角色名");
                var that = this;
                if (rolename != null && rolename != "") {
                    that.$axios({
                        method: "post",
                        url: "http://47.102.97.234:9090/addRole",
                        data: {
                            rolename: rolename,
                        },
                        withCredentials: true//防止session失效
                    }).then(function (res) {
                        if (res.data.flag == 1) {
                            alert("添加成功");
                        }
                        that.baseInfo(0);
                    }).catch(function (res) {
                        console.log("res");
                        alert("加载失败");
                    })
                }
            },
            loadAdmin: function () {
                var that = this;
                var admin = JSON.parse(localStorage.getItem("admin"));
                var navList = JSON.parse(localStorage.getItem("navList"));
                that.admin = admin;
                that.navList = navList;
            }

        }
    }
</script>

<style scoped>

</style>
