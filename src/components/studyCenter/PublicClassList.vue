<template>
  <div class="study-list">
    <div class="li-left">
      <div class="li-l-top">
        <span class="li-l-season">{{item.part_mode | filterSeason}}</span>
        <span class="li-l-subject">{{item.subject_mode | filterSub}}</span>
        <span class="li-l-text">{{item.course_name}}</span>
      </div>
      <div class="li-l-bottom">
        <span>
          <em>
            <img src="/static/images/icon_time.png" alt />
          </em>
        </span>
        <span class="data">{{item.day_str}}</span>
        <span
          class="week"
        >每周{{item.start_time ? item.start_time : item.class_start_time | filTime('week')}} {{item.last_time ? item.last_time : item.hour_str}}</span>
      </div>
    </div>
    <div class="li-right">
      <div class="li-r-box li-r-box-one">
        <div class="img-box">
          <img :src="item.teacher_img | filtImg('teacher')" alt="朴新好老师" />
        </div>
        <div class="li-r-title">
          <div class="title1">{{item.teacher_name}}</div>
          <div class="title2">授课老师</div>
        </div>
      </div>
      <div class="li-r-box">
        <div
          v-if="item.current_time>item.end_time"
          class="li-look-play-back"
          @click="isPlay(item, 1)"
        >看回放</div>
        <div
          v-if="item.start_time-item.current_time<=1800&&item.current_time<item.end_time"
          class="li-go-to-class"
          @click="isPlay(item, 2)"
        >去上课</div>
        <div
          v-if="item.start_time - item.current_time>1800"
          class="li-no-start"
          @click="waitCourse"
        >待上课</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPublicUrl } from "../../api/study";
const defaultImg = {
  teacher: "/static/images/shoukelaoshi.png",
  assistant: "/static/images/fudaolaoshi.png"
};
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      iframeSrc: ""
    };
  },
  methods: {
    isPlay(item, type) {
      getPublicUrl({
        data: {
          // unionid:"1",
          public_course_id: item.course_id
        },
        success: res => {
          if (res.data) {
            // 看回放  playback_url    去上课 bai_jia_yun_zb_url
            if (type == 1) {
              if (res.data.playback_url) {
                this.iframeSrc = res.data.playback_url;
                this.$router.push({
                  path: "/play_back",
                  query: {
                    iframeSrc: this.iframeSrc,
                    path: this.$route.path,
                    ...this.params
                  }
                });
              } else {
                this.$alert("回放地址暂未生成", "提示", {
                  confirmButtonText: "确定"
                });
              }

              // window.location.href = res.data.playback_url
            } else if (type == 2) {
              // this.iframeSrc = res.data.bai_jia_yun_zb_url;
              if (res.data.bai_jia_yun_zb_url) {
                this.iframeSrc = res.data.bai_jia_yun_zb_url;
                this.$router.push({
                  path: "/play_back",
                  query: {
                    iframeSrc: this.iframeSrc,
                    path: this.$route.path,
                    ...this.params
                  }
                });
              } else {
                this.$alert("回放地址暂未生成", "提示", {
                  confirmButtonText: "确定"
                });
              }
              // window.location.href = res.data.bai_jia_yun_zb_url
            }
            // window.location.href = res.data
          } else {
            this.$alert(res.message, "提示", {
              confirmButtonText: "确定"
            });
          }
        },
        error: err => {
          this.loading = false;
          this.loading1 = false;
          console.log("失败", err);
        }
      });
    }
  },
  filters: {
    filtImg(val, type) {
      return val || defaultImg[type];
    }
  }
};
</script>
<style lang="less" scoped>
.study-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.li-left {
  text-align: left;
  // margin-right: 299px;
  min-width: 350px;
  .li-l-top {
    height: 17px;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 19px;
    color: rgba(51, 51, 51, 1);
    .li-l-season,
    .li-l-subject {
      vertical-align: middle;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: #00a4ff;
      border-radius: 2px;
      color: #ffffff;
      font-size: 14px;
      width: 20px;
      display: inline-block;
      text-align: center;
    }
    .li-l-subject {
      width: 18px;
      height: 18px;
      line-height: 18px;
      background: #fff;
      color: #00a4ff;
      border: 1px solid #00a4ff;
    }
  }
  .li-l-bottom {
    display: flex;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    .data {
      margin: 0 5px;
    }
    i {
      margin: 0 5px;
      font-style: normal;
    }
  }
}
.li-right {
  min-width: 405px;
  display: flex;
  .li-r-box {
    display: flex;
    margin-right: 40px;
    margin-top: 10px;
    .img-box {
      width: 42px;
      height: 42px;
      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
    }
    .li-r-title {
      margin-left: 15px;
      .title1 {
        font-size: 18px;
        color: #333333;
      }
      .title2 {
        font-size: 14px;
        color: #999999;
      }
    }
    .li-go-to-class,
    .li-look-play-back,
    .li-no-start {
      cursor: pointer;
      text-align: center;
      width: 146px;
      height: 36px;
      line-height: 36px;
      background: rgba(0, 164, 255, 1);
      border-radius: 25px;
      color: #ffffff;
      font-size: 18px;
    }
    .li-look-play-back {
      background: #ffffff;
      color: #00a4ff;
      border: 2px solid #00a4ff;
    }
    .li-no-start {
      border: 2px solid #ffffff;
      background: #cccccc;
    }
  }
  .li-r-box-one {
    margin-right: 245px;
  }
}
@media (max-width: 1440px) {
  .li-r-box-one {
    margin-right: 100px !important;
  }
}
</style>

