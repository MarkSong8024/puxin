<template>
  <div class="course-box">
    <div class="c-top">
      <ul class="c-list">
        <li v-for="tab in tabs" :key="tab.type" @click="changeType(tab.type)">
          <span :class="{'check': tab.type == type}">{{tab.name}}</span>
        </li>
      </ul>
    </div>
    <div v-loading="loading">
      <div class="c-content">
        <ul class="c-list">
          <li v-for="(item, index) in publicCourseList" :key="index">
            <PublicClassList :item="item" :params="params"></PublicClassList>
          </li>
        </ul>
        <!-- 暂无数据 -->
        <div class="no-data" v-if="noData">
          <img src="../../../static/images/no-data.png" />
          <div class="no-public-class-box">
            <span class="no-public-class-title">暂无公开课 敬请期待</span>
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
import { getPublicClass, getPublicUrl } from "api/study";
import PublicClassList from "../../components/studyCenter/PublicClassList";
export default {
  components: { PublicClassList },
  data() {
    return {
      loading: false,
      noData: false,
      tabs: [
        {
          name: "全部",
          type: ""
        },
        {
          name: "即将开始",
          type: "0"
        },
        {
          name: "精彩回放",
          type: "1"
        }
      ],
      total: 0,
      publicCourseList: [],
      params: {
        type: this.$route.query.type || "",
        page_num: this.$route.query.page_num || "1",
        page_size: "10"
      },
      type: this.$route.query.type || "" // 默认公开课
    };
  },
  mounted() {
    // 请求课程
    this.getPublicClass(this.params);
  },
  methods: {
    // 获取数据
    getPublicClass(data) {
      this.loading = true;
      getPublicClass({
        data: data,
        success: res => {
          window.scrollTo(0, 0);
          setTimeout(() => {
            let data = res.data;
            this.total = parseInt(data.page.total, 10);
            this.publicCourseList = data.course_list;
            this.noData = this.publicCourseList.length === 0;
            this.loading = false;
          }, 500);
        },
        error: err => {
          this.loading = false;
        }
      });
    },
    // 切换页码
    changePage(val) {
      this.params.page_num = `${val}`;
      this.getPublicClass(this.params);
    },
    // 切换类型
    changeType(type) {
      this.publicCourseList = [];
      this.total = 0;
      this.type = type;
      this.params.page_num = "1";
      this.params.type = type;
      this.getPublicClass(this.params);
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
        // cursor: pointer;
        min-width: 700px;
        min-height: 53px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(236, 236, 238, 0.7);
        border-radius: 3px;
        margin-bottom: 30px;
        padding: 36px;
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

