import Vue from 'vue'
import Router from 'vue-router'
import choose from "../page/choose/choose";
import login from "../page/login/login";
import register from "../page/register/register";
import superLogin from "../page/superLogin/superLogin";
import index from "../page/index/index";
import notice from "../page/notice/notice";
import rotation from "../page/rotation/admin/rotation";
import uploadRotation from "../page/uploadRotation/uploadRotation";
import sort from "../page/rotation/sort/sort";
import apply from "../page/admin/apply/apply";
import handleAdmin from "../page/admin/handleAdmin/handleAdmin";
import Role from "../page/Role/Role";
import RoleAdmin from "../page/admin/RoleAdmin/RoleAdmin";
import group from "../page/Group/group";
import reply from "../page/reply/reply";
import comment from "../page/comment/comment";
import user from "../page/user/user";
import myself from "../page/myself/myself";
import fouzerofour from "../page/404/fouzerofour";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'choose',
      component: choose
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/superLogin',
      name: 'superLogin',
      component: superLogin
    },
    {
      path: '/index',
      name: 'index',
      meta:{
        requireAuth:true
      },
      component: index
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/rotation',
      name: 'rotation',
      meta:{
        requireAuth: true
      },
      component: rotation
    },
    {
      path: '/uploadRotation',
      name: 'uploadRotation',
      meta:{
        requireAuth:true
      },
      component: uploadRotation
    },
    {
      path: '/sort',
      name: 'sort',
      meta:{
        requireAuth:true
      },
      component: sort
    },
    {
      path: '/apply',
      name: 'apply',
      meta:{
        requireAuth:true
      },
      component: apply
    },
    {
      path: '/handleAdmin',
      name: 'handleAdmin',
      meta:{
        requireAuth:true
      },
      component: handleAdmin
    },
    {
      path: '/Role',
      name: 'Role',
      meta:{
        requireAuth:true
      },
      component: Role
    },
    {
      path: '/RoleAdmin',
      name: 'RoleAdmin',
      meta:{
        requireAuth:true
      },
      component: RoleAdmin
    },
    {
      path: '/group',
      name: 'group',
      meta:{
        requireAuth:true
      },
      component: group
    },
    {
      path: '/reply',
      name: 'reply',
      meta:{
        requireAuth:true
      },
      component: reply
    },
    {
      path: '/comment',
      name: 'comment',
      meta:{
        requireAuth:true
      },
      component: comment
    },
    {
      path: '/user',
      name: 'user',
      meta:{
        requireAuth:true
      },
      component: user
    },
    {
      path: '/myself',
      name: 'myself',
      meta:{
        requireAuth:true
      },
      component: myself
    },
    {
      path: '/fouzerofour',
      name: 'fouzerofour',
      component: fouzerofour
    },
    {
      path: "*",
      redirect: "/fouzerofour"
    }


  ]
})
