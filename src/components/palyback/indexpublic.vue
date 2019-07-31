<template>
    <div class="if-main main">
      <top-nav-com></top-nav-com>
      <top-nav-banner-com  :isActive="true"></top-nav-banner-com>
      <div class="fi-cotent">
        <iframe class="if-box" :src="iframeSrc" width='100%' height='100%' allow="geolocation;microphone;camera"></iframe>
      </div>
    </div>

</template>


<script>
import TopNavCom from "../topNav/TopNavCom";
import TopNavBannerCom from "../topNav/TopNavBannerCom";



export default {
    components:{TopNavCom, TopNavBannerCom},
    data(){
        return{
        iframeSrc:'' //看回放
        }
    },
    mounted() {
       console.log(this.$route.query.url)
         if (this.$route.query.url) {
        this.iframeSrc = this.$route.query.url;
      } else {
        this.$alert('回访地址暂未生成','提示',{
          confirmButtonText:'确定'
        })
      }

    },
};
</script>
<style lang="less" scope>

  .fi-cotent{
    height: calc(~'100% - 90px - 30px');
  }

</style>
<style lang="less" scoped>
  .if-main{position:fixed;top:0;left: 0;width: 100%;height: 100%;z-index: 999;}
  .if-box{border: none}
  .if-head{height: 60px;background: #fff;}
  .fi-cotent{
    height: calc(~'100% - 90px - 30px');
  }
  .footer-box{height: 30px; display: flex;
    align-items: center; justify-content:center; background: #000000;color: #fff;
    font-size: 12px;}

  @media screen and (max-width: 900px){
    .fi-cotent{ height: calc(~'100% - 60px - 60px');}
    .footer-box{
      height: 60px; padding: 0 2%}
  }
</style>
