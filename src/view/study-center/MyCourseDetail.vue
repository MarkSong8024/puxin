<template>
  <div class="course-detail-box">
    <div class="c-top">
      <span @click="back" class="back-box">
        <span class="el-icon-arrow-left"></span> 返回
      </span>
    </div>
    <div class="c-content" v-loading="loading">
      <StudyList :item="data"></StudyList>
      <div class="info-list">
        <ul>
          <li v-for="(item, index) in detailsList" :key="index">
            <div v-for="(childItem, childIndex) in item.info" :key="childIndex" class="li-info-box">
              <div class="li-left">
                <div class="li-l-top">
                  <span>第{{index+1}}讲：{{childItem.chapter_name}}</span>
                </div>
                <div class="li-l-bottom">
                  <em>
                    <img src="/static/images/icon_time.png" alt />
                  </em>
                  <span>{{childItem.start_time | filTime('mm-dd')}}</span>
                  <span>{{childItem.last_time}}</span>
                </div>
              </div>
              <div class="li-right">
                <!-- 看回放 -->
                <div
                  v-if="childItem.class_status==3"
                  class="li-look-play-back"
                  @click="play(childItem)"
                >看回放</div>
                <!-- 去上课 -->
                <div
                  v-if="childItem.start_time-item.current_time<=1800&&childItem.class_status!=3"
                  @click="play(childItem)"
                  class="li-go-to-class"
                >去上课</div>
                <!-- 未开始 -->
                <div
                  v-if="childItem.start_time - item.current_time > 1800"
                  @click="waitCourse"
                  class="li-no-start"
                >未开始</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import StudyList from "../../components/studyCenter/StudyList";
import { getCourseDetail, getUrl } from "../../api/study";
export default {
  components: { StudyList },
  data() {
    return {
      loading: true,
      data: this.$route.query || {}, // 默认数据为空
      detailsList: [],
      iframeSrc: "" // 看回放
    };
  },
  methods: {
    // 返回
    back() {
      const params = { path: "/study_center/my_course" };
      if (this.data.page_num && this.data.type) {
        params.query = {
          page_num: this.data.page_num,
          type: this.data.type
        };
      }
      this.$router.push(params);
    },
    // 获取详情
    getCourseDetail() {
      this.loading = true;
      getCourseDetail({
        data: { class_id: this.data.class_id },
        success: res => {
          if (res.data) {
            let data = res.data;
            this.detailsList = data.chapter_list;
            this.loading = false;
          }
        },
        error: err => {
          console.log("失败", err);
          this.loading = false;
        }
      });
    },
    // 未开始
    waitCourse() {
      this.$alert("课程还未开始，请耐心等待~", "提示", {
        confirmButtonText: "确定"
      });
    },
    // 播放
    play(chapt) {
      getUrl({
        data: {
          chapter_id: chapt.chapter_id
        },
        success: res => {
          if (res.data) {
            this.iframeSrc = res.data;
            this.$router.push({
              path: "/play_back",
              query: {
                iframeSrc: this.iframeSrc,
                path: this.$route.path,
                ...this.$route.query
              }
            });
          } else {
            this.$alert(res.message, "提示", {
              confirmButtonText: "确定"
            });
          }
        },
        error: err => {
          this.loading = false;
          console.log("失败", err);
        }
      });
    }
  },
  mounted() {
    this.getCourseDetail();
  }
};
</script>
<style lang="less" scoped>
.course-detail-box {
  margin-left: 335px;
  width: calc(~"100% - 330px");
  text-align: left;
  .c-top {
    position: fixed;
    top: 0;
    width: 100%;
    background: #ffffff;
    padding-left: 48px;
    height: 92px;
    line-height: 92px;
    border-bottom: 2px solid #efefef;
    .back-box {
      cursor: pointer;
    }
  }
  .c-content {
    .study-list {
      position: fixed;
      top: 93px;
      padding: 48px 0 48px 48px;
      background: #ffffff;
      /deep/ .li-right {
        margin-right: 426px;
      }
    }
    .info-list {
      margin: 246px 48px 0 48px;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          min-width: 550px;
          padding: 33px;
          min-height: 53px;
          box-shadow: 0px 0px 10px 0px rgba(236, 236, 238, 0.7);
          border-radius: 3px;
          margin-bottom: 30px;
          &:hover {
            box-shadow: 0 1px 23px 1px rgba(45, 117, 212, 0.13);
          }
          .li-info-box {
            display: flex;
            justify-content: space-between;
            .li-left {
              min-width: 350px;
              .li-l-top {
                span {
                  font-size: 20px;
                  color: #333333;
                }
                margin-bottom: 12px;
              }
              .li-l-bottom {
                font-size: 14px;
                color: #888888;
                em {
                  vertical-align: sub;
                }
              }
            }
            .li-right {
              margin-right: 114px;
              margin-top: 10px;
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
          }
        }
      }
    }
  }
}
// 媒体查询
@media (max-width: 1440px) {
  .main-page .course-detail-box {
    width: calc(~"100% - 249px");
    margin-left: 249px;
  }
}
</style>
