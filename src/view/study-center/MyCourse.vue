<template>
  <div class="course-box">
    <div class="c-top">
      <ul class="c-list">
        <li v-for="tab in tabs" :key="tab.type" @click="changeType(tab.type)">
          <span :class="{'check': tab.type == type}">{{tab.name}}</span>
        </li>
      </ul>
    </div>
    <div id="loadingBox" v-loading="loading">
      <div class="c-content">
        <ul class="c-list">
          <li v-for="(item, index) in courseList" :key="index" @click="goDetail(item)">
            <StudyList :item="item"></StudyList>
            <!-- <div class="li-left">
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
            </div>-->
          </li>
        </ul>
        <!-- 无数据 -->
        <div class="no-data" v-if="noData">
          <img src="../../../static/images/no-data.png" />
          <div class="no-public-class-box">
            <span class="no-public-class-title">暂无课程 敬请期待</span>
          </div>
        </div>
      </div>
      <div class="c-bottom" v-if="total>0">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :current-page="parseInt(params.page_num, 10)"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getCourseList } from "api/study";
import StudyList from "../../components/studyCenter/StudyList";
import { Loading } from "element-ui";
export default {
  components: { StudyList },
  data() {
    return {
      loading: false,
      noData: false,
      tabs: [
        {
          name: "全部",
          type: "5"
        },
        {
          name: "开课中",
          type: "1"
        },
        {
          name: "未开课",
          type: "0"
        },
        {
          name: "已结课",
          type: "2"
        }
      ],
      total: 0,
      courseList: [],
      params: {
        type: this.$route.query.type || "5",
        page_num: this.$route.query.page_num || "1",
        page_size: "10"
      },
      type: this.$route.query.type || "5" // 默认课程
    };
  },
  mounted() {
    // 请求课程
    this.getCourseList(this.params);
  },
  methods: {
    getCourseList(type) {
      this.loading = true;
      // type 1开课中； 0未开课；2已结课
      getCourseList({
        data: type,
        success: res => {
          if (res.data) {
            window.scrollTo(0, 0);
            setTimeout(() => {
              let data = res.data;
              this.courseList = data.list;
              this.total = parseInt(data.total, 10);
              this.noData = this.courseList.length === 0;
              this.loading = false;
            }, 500);
          } else {
            this.loading = false;
            this.$alert(res.message || "网络异常", "提示", {
              confirmButtonText: "确定"
            });
          }
        },
        error: err => {
          this.loading = false;
          console.log("失败", err);
        }
      });
      // 关闭loading
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    // 切换页码
    changePage(val) {
      this.params.page_num = `${val}`;
      this.getCourseList(this.params);
    },
    // 切换类型
    changeType(type) {
      this.total = 0;
      this.type = type;
      this.params.page_num = "1";
      this.params.type = type;
      this.getCourseList(this.params);
    },
    // 去详情页
    goDetail(params) {
      params = Object.assign(this.params, params);
      this.$router.push({
        path: "/study_center/my_course_detail",
        query: params
      });
    }
  }
};
</script>

<style lang="less" scoped>
.course-box {
  background: #ffffff;
  margin-left: 335px;
  width: calc(~"100% - 330px");
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .c-top {
    width: 100%;
    position: fixed;
    top: 0;
    background: #ffffff;
    height: 92px;
    line-height: 92px;
    border-bottom: 2px solid #efefef;
    .c-list {
      display: flex;
      margin-left: 47px;
      li {
        cursor: pointer;
        margin-right: 40px;
        font-size: 16px;
        color: #333333;
        span {
          letter-spacing: 1px;
          &.check {
            font-size: 20px;
            color: #00a4ff;
          }
        }
      }
    }
  }
  .c-content {
    .c-list {
      margin: 127px 52px 0 48px;
      li {
        min-width: 685px;
        cursor: pointer;
        min-height: 53px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(236, 236, 238, 0.7);
        border-radius: 3px;
        margin-bottom: 30px;
        padding: 36px;
        &:hover {
          box-shadow: 0 1px 23px 1px rgba(45, 117, 212, 0.13);
          /deep/ .li-left {
            .li-l-text {
              color: #00a4ff;
            }
          }
        }
      }
    }
    .no-data {
      height: calc(~"100vh - 140px");
      img {
        margin-top: calc(~"50vh - 140px");
        width: 208px;
      }
      .no-public-class-box {
        margin-top: 10px;
        .no-public-class-title {
          color: #333333;
          margin-left: 20px;
        }
      }
    }
  }
  .c-bottom {
    margin-bottom: 50px;
  }
}
// 媒体查询
@media (max-width: 1440px) {
  .main-page .course-box {
    width: calc(~"100% - 249px");
    margin-left: 249px;
  }
}
</style>

