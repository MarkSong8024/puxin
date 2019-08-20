<template>
  <div class="if-main main">
    <!-- <top-nav-com></top-nav-com> -->
    <!-- <top-nav-banner-com :isShowLine="true"></top-nav-banner-com> -->
    <div class="go-back" @click="back">
      <span class="el-icon-arrow-left"></span>
      <span class="go-back-title">返回</span>
    </div>
    <div class="fi-cotent">
      <iframe
        class="if-box"
        :src="src"
        width="100%"
        height="100%"
        allow="geolocation;microphone;camera"
      ></iframe>
    </div>
  </div>
</template>

<script>
// import TopNavCom from "../topNav/TopNavCom";
// import TopNavBannerCom from "../topNav/TopNavBannerCom";
export default {
  name: "IfameBoxCom",
  // components: {
  //   TopNavCom,
  //   TopNavBannerCom
  // },
  data() {
    return {
      token: this.$store.state.user.u ? this.$store.state.user.u.token : "",
      params: this.$route.query.params,
      path: this.$route.query.path,
      query: this.$route.query
    };
  },
  props: {
    src: String
  },
  methods: {
    back() {
      const path = this.$route.query.path;
      const query = this.$route.query;
      delete query.path;
      delete query.iframeSrc;
      this.$router.replace({
        path,
        query
      });
    }
  },
  created() {
    if (!this.token) this.$router.replace('/login');
  }
};
</script>

<style lang="less" scoped>
.if-main {
  position: fixed;
  top: 0;
  width: calc(100% - 20px);
  height: 100%;
  z-index: 99999;
  .go-back {
    cursor: pointer;
    position: absolute;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 22px;
    background: #090300;
    opacity: 0.76;
    border-radius: 4px;
    // box-shadow: darkgrey 0px 0px 0px 2px;
    .go-back-title {
      padding-right: 4px;
    }
  }
}
.if-box {
  border: none;
}
.if-head {
  height: 60px;
  background: #fff;
}
.fi-cotent {
  // height: calc(~"100% - 90px - 30px");
  width: 100%;
  height: 100%;
}
.footer-box {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  color: #fff;
  font-size: 12px;
}

@media screen and (max-width: 900px) {
  .fi-cotent {
    // height: calc(~"100% - 60px - 60px");
    height: 100%;
  }
  .footer-box {
    height: 60px;
    padding: 0 2%;
  }
}
</style>
