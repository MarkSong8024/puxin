<template>
  <div class="video-box">
    <!-- <top-nav-com></top-nav-com> -->
    <!-- <top-nav-banner-com :isShowLine="true"></top-nav-banner-com> -->
    <ifame-box-com :src="iframeSrc" v-if="iframeSrc!=''"></ifame-box-com>
  </div>
</template>
<script>
// import TopNavCom from "../topNav/TopNavCom";
// import TopNavBannerCom from "../topNav/TopNavBannerCom";
import { getUrl } from "../../api/study";
import IfameBoxCom from "../base/IfameBoxCom";

export default {
  components: {
    // TopNavCom,
    // TopNavBannerCom,
    IfameBoxCom
  },
  data() {
    return {
      iframeSrc: this.$route.query.iframeSrc //看回放
    };
  }
};
</script>
<style lang="less" scope>
.video-box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
