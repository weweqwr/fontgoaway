<template>
  <div id="myself">
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
    <!--头像上传-->
    <remote-css href="static/headupload/css/cropper.min.css"></remote-css>
    <remote-css href="static/headupload/css/ImgCropping.css"></remote-css>
    <remote-script src="static/headupload/Js/jquery-2.1.1.min.js"></remote-script>
    <remote-script src="static/headupload/js/cropper.min.js"></remote-script>
    <remote-script src="static/headupload/js/myself.js"></remote-script>
    <!--    &lt;!&ndash;省市级三级联动&ndash;&gt;-->
    <remote-script src="static/js/province.js"></remote-script>
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
        <div class="company_identify">
          <div class="manage-head">
            <h6 class="padding-left manage-head-con">个人中心</h6>
          </div>


          <div class="basic-info-detail clearfix">
            <div class="unit-style padding-big-lr clearfix" style="width: 100%;height: 100px;">
              <h4 class="real-name-head margin-large-top">个人信息<span class="margin-left <text-normal></text-normal>">务必保证真实</span>
              </h4>
              <div class="real-name-con clearfix">
                <center>
                  <div style="width: 100px;height: 100px;border: 1px  solid silver;">
                    <img id="finalImg" v-bind:src="avatarUrl" width="100%">
                  </div>
                </center>
              </div>
              <div style="margin-left: 20%;">
                <div class="real-name-con clearfix">
                  <p class="content-left-zoon" style="margin-right: 2%;">
                    用户头像:
                  </p>
                  <button id="replaceImg" class="l-btn" style="float: left; ">更换图片</button>
                </div>
                <div class="real-name-con clearfix margin-">
                  <div style="display: none" class="tailoring-container">
                    <div class="black-cloth" onclick="closeTailor(this)"></div>
                    <div class="tailoring-content">
                      <div class="tailoring-content-one">
                        <label title="上传图片" for="chooseImg" class="l-btn choose-btn">
                          <input type="file" accept="image/jpg,image/jpeg,image/png" name="file" id="chooseImg"
                                 class="hidden" ref="filename" onchange="selectImg(this)" >
                          选择图片
                        </label>
                        <div class="close-tailoring" onclick="closeTailor(this)">×</div>
                      </div>
                      <div class="tailoring-content-two">
                        <div class="tailoring-box-parcel">
                          <img id="tailoringImg">
                        </div>
                        <div class="preview-box-parcel">
                          <p>图片预览：</p>
                          <div class="square previewImg"></div>
                          <div class="circular previewImg"></div>
                        </div>
                      </div>
                      <div class="tailoring-content-three">
                        <button class="l-btn cropper-reset-btn">复位</button>
                        <button class="l-btn cropper-rotate-btn">旋转</button>
                        <button class="l-btn cropper-scaleX-btn">换向</button>
                        <button class="l-btn sureCut" id="sureCut">确定</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="real-name-con height-main margin-top-25 clearfix">
                  <p class="content-left-zoon">
                    用户名称:
                  </p>
                  <div class="content-right-zoon">
                    <input class="width-main input" type="text" ref="username" v-model="username">
                  </div>
                  <div class="content-right-zoon">
                    <input class="width-main input" type="textarea" id="filebase64"  ref="filebase64" style="display: none;">
                  </div>
                </div>
                <div class="real-name-con height-main margin-top-25 clearfix">
                  <p class="content-left-zoon">
                    性别:
                  </p>
                  <div class="content-right-zoon" v-for="(item,i) in gender">
                    <div style="margin-left: 2%; float: left; ">

                      <input type="radio" name="test" :value="item.value"  v-model="checkvalue"  ref="gender"/>{{item.val}}

                    </div>
                  </div>
                </div>
                <div class="real-name-con height-main margin-top-25 clearfix">
                  <p class="content-left-zoon">
                    省市级:
                  </p>
                  <input type="text" id="storagePro">
                  <div class="content-right-zoon" style="float: left; margin-left: 2%;padding-top: 5px;">
                    <div style="float: left;">
                      <select id="province" name="province" onchange="doProvAndCityRelation();"  ref="province" >
                        <option id="choosePro" value="-1">{{province}}</option>
                      </select>
                    </div>
                    <div style="float: left;">
                      <select id="citys" name="city" onchange="doCityAndCountyRelation();" ref="city">
                        <option id="chooseCity" value="-1">{{city}}</option>
                      </select>
                    </div>
                    <div style="float: left;">
                      <select id="county" name="county" ref="area">
                        <option id="chooseCounty" value="-1">{{area}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="real-name-con height-main margin-top-25 clearfix">
                  <p class="content-left-zoon"  >
                    详细地址
                  </p>
                  <div class="content-right-zoon">
                    <input class="width-main input" type="text" v-model="detailAdd" ref="detailAdd">
                  </div>
                </div>
                <div class="real-name-con height-main margin-top-25 clearfix">
                  <p class="content-left-zoon" ref="phone" >
                    联系电话
                  </p>
                  <div class="content-right-zoon">
                    <input class="width-main input" type="text" v-model="phone" ref="phone">
                  </div>
                </div>
              </div>
              <div style="margin-left:45%;" class="margin-top-25" >
                <input type="submit" value="提交" class="submit fl" v-on:click="updateAdminInfo">
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
        name: "myself",
        data() {
            return {
                admin: [],
                checkvalue:'',
                gender: [{value: 1, val: "男"}, {value: 0, val: "女"}],
                username:'',
                avatarUrl:'',
                province:'',
                city:'',
                area:'',
                detailAdd:'',
                phone:'',
                province:'',
                navList:[]
            }
        },
        created() {
            this.loadAdmin();
        },
        methods: {
            loadAdmin: function () {
                var that = this;
                var admin = JSON.parse(localStorage.getItem("admin"));
                var navList=JSON.parse(localStorage.getItem("navList"));
                that.admin = admin;
                that.navList=navList;
                console.log(admin)
                that.admin = admin
                that.username=admin[0].username;
                that.avatarUrl=admin[0].avatarUrl;
                that.detailAdd=admin[0].detailAdd;
                that.phone=admin[0].phone;
                that.genderStorage=admin[0].gender;
                that.province=admin[0].province;
                that.checkvalue=admin[0].gender;
                that.city=admin[0].city;
                that.area=admin[0].area;

            },
            updateAdminInfo: function () {
                var that = this;
                // that.dataURLtoFile()
                var account=localStorage.getItem("account");
                var gender = that.checkvalue;
                console.log(gender)
                alert(gender)
                var filebase64 =that.$refs.filebase64.value;
                var file=null;
                if(filebase64!=null&&filebase64!='') {
                    file = that.dataURLtoFile(filebase64, account + ".jpg");
                }
                var provinceCode =that.$refs.province;
                var username=that.$refs.username.value;
                var cityCode =that.$refs.city;
                var areaCode =that.$refs.area;
                var province=provinceCode.options[provinceCode.options.selectedIndex].text;
                var city=cityCode.options[cityCode.options.selectedIndex].text;
                var area=areaCode.options[areaCode.options.selectedIndex].text;
                var detailAdd=that.$refs.detailAdd.value;
                var phone=that.$refs.phone.value;
                var account = localStorage.getItem("account");
                let param = new FormData();

                param.append('file', file);
                param.append('username', username);
                param.append('gender', gender);
                param.append('province', province);
                param.append('city', city);
                param.append('area', area);
                param.append('detailAdd', detailAdd);
                param.append('phone', phone);
                param.append('account', account);
                param.append('filename', account);
                this.$axios({
                    method: "post",
                    url: "http://47.102.97.234:9090/updateAdminInfo",
                    data: param,
                    config: "multipart/form-data;",
                    withCredentials: true//防止session失效
                }).then(function (res) {
                    var info = res.data
                    alert("信息以更改，需重新登录才能刷新！");
                }).catch(function (res) {
                    console.log(res);
                })
            },
            //将base64装为file
            dataURLtoFile: function(dataurl, filename) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            },


        }
    }
</script>

<style scoped>

</style>
