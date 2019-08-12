<template>
  <div class="list-box" :style="{'height': winHeight}">
    <div class="top">
      <div class="top-logo">
        <img src="../../../static/images/login-logo.png" alt />
        <div>
          <span class="top-version">|</span>
          <span class="top-version">学生版</span>
        </div>
      </div>
      <div class="head">
        <div class="head-border">
          <img :src="u.avatar || defalutUrl" alt="个人头像" />
        </div>
      </div>
      <div class="h-info">
        <div class="h-info-top">
          <span>{{u.nickname}}</span>
        </div>
        <div>
          <span>{{dateTime | filTime('mm-dd', 'mill')}} 周{{dateTime| filTime('week', 'mill')}} {{hMTime | filTime('hh-mm', 'mill')}}</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="l-route">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{'check':active == item.id}"
            @click="go(item)"
          >
            <img :class="item.class" :src="item.src" alt />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="exit-bottom" @click="exit">
      <img src="../../../static/images/exit.png" alt />
      <span>退出登录</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  removeVuex
} from "../../utils/cookie";
export default {
  computed: {
    ...mapState({
      u: state => state.user.u || {}
    })
  },
  data() {
    return {
      defalutUrl: "../../../static/images/default_avatar.png",
      active: 2,
      list: [
        {
          id: 1,
          name: "直播列表",
          path: "/live/main",
          src: "../../../static/images/live-list.png"
        },
        {
          id: 2,
          name: "我的课程",
          path: "/study_center/my_course",
          src: "../../../static/images/my-class.png",
          class: "vertical"
        },
        {
          id: 3,
          name: "我的公开课",
          path: "/study_center/my_public_class",
          src: "../../../static/images/my-public-class.png",
          class: "across"
        }
      ],
      dateTime: new Date().getTime(),
      hMTime: new Date().getTime(),
      timer: null,
      winHeight: "100vh"
    };
  },
  methods: {
    go(item) {
      this.active = item.id;
      this.$router.push(item.path);
    },
    // 退出登录
    exit() {
      removeVuex();
      removeToken();
      removeUserInfo();
      this.$store.dispatch("quitLogin");
      this.$router.push("/login");
    },
    getTime() {
      const timer = setTimeout(() => {
        this.hMTime = new Date().getTime();
        this.getTime();
        clearTimeout(timer);
      }, 1000);
    },
    // 获取屏幕高度
    getHeight() {
      try {
        this.winHeight = window.screen.height + "px";
      } catch (error) {
        this.winHeight = "100vh";
      }
    }
  },
  created() {
    this.getTime();
    this.active = this.$route.meta.id;
    // 获取当前屏幕的高度
    // this.getHeight();
  }
};
</script>

<style lang="less" scoped>
.list-box {
  width: 330px;
  height: 100vh;
  position: fixed;
  background: linear-gradient(
    0deg,
    rgba(17, 33, 73, 1) 0%,
    rgba(47, 72, 133, 1) 100%
  );
  .top-logo {
    display: flex;
    justify-content: center;
    margin-top: 42px;
    img {
      width: 122px;
      height: 22px;
    }
    .top-version {
      margin-left: 16px;
      font-size: 16px;
      color: #8295c6;
    }
  }
  .head {
    margin: 60px auto 47px auto;
    .head-border {
      width: 105px;
      height: 105px;
      border-radius: 50%;
      background: #afbcdf;
      margin: 0 auto;
      img {
        margin-top: 5px;
        width: 95px;
        height: 95px;
        border-radius: 50%;
      }
    }
  }
  .h-info {
    font-size: 16px;
    color: #dee7ff;
    .h-info-top {
      margin-bottom: 20px;
    }
  }
  .line {
    margin: 30px auto 35px auto;
    width: 230px;
    height: 1px;
    background: rgba(72, 88, 128, 1);
    border-radius: 1px;
  }
  .l-route {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;
      li {
        position: relative;
        cursor: pointer;
        user-select: none;
        text-align: left;
        padding-left: 94px;
        height: 72px;
        line-height: 72px;
        span {
          color: #dee7ff;
          font-size: 18px;
        }
        &.check {
          background: rgba(24, 42, 87, 1);
          &::after {
            content: "";
            position: absolute;
            top: 26px;
            left: 320px;
            width: 0;
            height: 0;
            border-bottom: 10px solid transparent;
            border-top: 10px solid transparent;
            border-right: 10px solid #ffffff;
          }
        }
        img {
          height: 20px;
          width: 22px;
          margin-right: 14px;
          vertical-align: sub;
          &.vertical {
            width: 18px;
            height: 21px;
          }
          &.across {
            width: 20px;
            height: 21px;
          }
        }
      }
    }
  }
  .exit-bottom {
    position: absolute;
    bottom: 60px;
    margin-left: 94px;
    cursor: pointer;
    user-select: none;
    text-align: left;
    img {
      width: 19px;
      height: 21px;
      margin-right: 14px;
      vertical-align: sub;
    }
    span {
      font-size: 18px;
      color: #dee7ff;
    }
  }
}
// 媒体查询
@media (max-width: 1440px) {
  .main-page .list-box {
    width: 248px;
    .l-route {
      ul {
        li {
          padding-left: 64px;
          &.check {
            &::after {
              left: 238px;
            }
          }
        }
      }
    }
    .exit-bottom {
      margin-left: 64px;
    }
  }
  .main-page .course-box {
    margin-left: 285px;
  }
}
</style>

