<template>
  <div class="study-list">
    <div class="li-left">
      <div class="li-l-top">
        <span class="li-l-season">{{item.quarter_mode | filterQuarter}}</span>
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
        <i>|</i>
        <span>共{{item.course_times_num}}课次</span>
      </div>
    </div>
    <div class="li-right">
      <div class="li-r-box">
        <div class="img-box">
          <img :src="item.teacher_img | filtImg('teacher')" alt="朴新好老师" />
        </div>
        <div class="li-r-title">
          <div class="title1">{{item.teacher_name}}</div>
          <div class="title2">主讲老师</div>
        </div>
      </div>
      <div class="li-r-box">
        <div class="img-box">
          <img :src="item.assistant_img | filtImg('assistant')" alt="朴新好老师" />
        </div>
        <div class="li-r-title">
          <div class="title1">{{item.assistant_name}}</div>
          <div class="title2">辅导老师</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const defaultImg = {
  teacher: "/static/images/shoukelaoshi.png",
  assistant: "/static/images/fudaolaoshi.png"
};
export default {
  props: {
    item: {
      type: Object,
      required: true
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
  min-width: 350px;
  // margin-right: 299px;
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
  display: flex;
  min-width: 350px;
  .li-r-box {
    display: flex;
    margin-right: 40px;
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
  }
}
</style>

