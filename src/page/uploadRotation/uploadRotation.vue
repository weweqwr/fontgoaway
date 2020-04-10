<template>
  <div id="uploadRotation">

    <!--网页基本元素-->
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
    <!--上传控件-->
    <remote-css href="static/upload/upload.css"></remote-css>
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
              <h6 class="layout padding-left manage-head-con">轮播图上传
                <span class="fr text-small text-normal padding-top">发布时间：2020-04-05</span>
                <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">2.4.0.160708</em></span>
              </h6>
            </div>
          </div>

          <!----------------------->
          <div class="hello">
            <div class="upload">
              <div class="upload_warp">
                <div class="upload_warp_left" @click="fileClick">
                  <img src="static/upload/img/upload.png">
                </div>
                <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
                  或者将文件拖到此处
                </div>
              </div>
              <div class="upload_warp_text">
                选中{{imgList.length}}个文件，共{{bytesToSize(this.size)}}
                <span class="ml20 c-red">[单个附件的最大尺寸为10MB]</span>
              </div>
              <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none">
              <div class="upload_warp_img" v-show="imgList.length!=0">
                <div class="upload_warp_img_div" v-for="(item,index) of imgList">
                  <div class="upload_warp_img_div_top">
                    <div class="upload_warp_img_div_text">
                      {{item.file.name}}
                    </div>
                    <img src="static/upload/img/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                  </div>
                  <img :src="item.file.src">
                </div>
              </div>
            </div>
          </div>
          <a class="button bg-green-deep" v-on:click="upload()">上传</a>
          <!-------------------->

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
        name: "uploadRotation",
        data(){
            return{
                imgList: [],
                size: 0,
                admin:[],
                navList:[]
            }
        },
        created() {
            this.loadAdmin();
        },
        methods: {
            upload: function () {
                var that=this;
                var imgList=that.imgList;
                var len = imgList.length;
                console.log(imgList[0].file.name)
                //异步请求只能用let
                for (let i = 0; i < len; i++) {
                    let param = new FormData();
                    var account=localStorage.getItem("account");
                    param.append('upfile', imgList[i].file);
                    param.append('filename', imgList[i].file.name);
                    param.append('originator', account);
                    var config = 'multipart/form-data;';
                    console.log(imgList[i].file.name)
                    this.$axios({
                        method: "post",
                        url: "http://47.102.97.234:9090/uploadImage",
                        data: param,
                        config: "multipart/form-data;",
                        withCredentials: true//防止session失效
                    }).then(function (res) {
                        var info=res.data
                        console.log(info)
                        if(info.flag==1) {
                            alert("上传"+i+"图成功")
                            if(i==len-1){
                                that.$router.go(0);
                            }
                        }else{
                            alert("上传文件失败")
                        }
                    }).catch(function (res) {
                        alert("第" + i + "张图上传失败")
                        console.log(res);
                    })
                }
            },
            fileClick(){
                document.getElementById('upload_file').click()
            },
            fileChange(el){
                if (!el.target.files[0].size) return;
                this.fileList(el.target.files);
                el.target.value = ''
            },
            fileList(files){
                for (let i = 0; i < files.length; i++) {
                    this.fileAdd(files[i]);
                }
            },
            fileAdd(file){
                this.size = this.size + file.size;//总大小
                let reader = new FileReader();
                reader.vue = this;
                reader.readAsDataURL(file);
                reader.onload = function () {
                    file.src = this.result;
                    this.vue.imgList.push({
                        file
                    });
                }
            },
            fileDel(index){
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
            },
            bytesToSize(bytes){
                if (bytes === 0) return '0 B';
                let k = 1000, // or 1024
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));
                return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            },
            dragenter(el){
                el.stopPropagation();
                el.preventDefault();
            },
            dragover(el){
                el.stopPropagation();
                el.preventDefault();
            },
            drop(el){
                el.stopPropagation();
                el.preventDefault();
                this.fileList(el.dataTransfer.files);
            },
            loadAdmin:function () {
                var that = this;
                var admin = JSON.parse(localStorage.getItem("admin"));
                var navList=JSON.parse(localStorage.getItem("navList"));
                that.admin = admin;
                that.navList=navList;
            }

        },



    }
</script>

<style scoped>

</style>
