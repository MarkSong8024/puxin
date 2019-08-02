<template>
  <div class="calendar-box">
    <div class="calender-top">
      <span class="el-icon-arrow-left"></span>
      <span @click="goToday">回到今天</span>
    </div>
    <div class="calendar-content">
      <div class="calendar-left">
        <el-calendar :range="currentDate">
          <template slot="dateCell" slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''">{{ data.day.split('-')[2]}}</p>
          </template>
        </el-calendar>
      </div>
      <div class="calendar-right">
        <div class="c-r-left">
          <span class="el-icon-arrow-left"></span>
          <span>2019年8月</span>
          <span class="el-icon-arrow-right"></span>
        </div>
        <div class="c-r-right" @click="showCurrentDate">
          <span>{{isOpen? '收起': '展开'}}日历</span>
          <span :class="[isOpen?'el-icon-arrow-up' : 'el-icon-arrow-down']"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeekDate } from "../../utils/filter";
import moment from "moment";
export default {
  data() {
    return {
      isOpen: false, // 日历是否打开
      newDate: moment().format("YYYY-MM-DD"),
      currentDate: getWeekDate(new Date()) // 获取本周时间
    };
  },
  methods: {
    /**
     * 展示具体日期
     */
    showCurrentDate(fromGoToday) {
      this.isOpen = !this.isOpen;
      const date = this.$children[0].selectedDay;
      this.currentDate = this.isOpen
        ? this.getMonthStartEnd(this.$children[0].selectedDay)
        : getWeekDate(new Date(date));
      this.$nextTick(() => {
        this.rewriteTitle();
      });
    },
    /**
     * 返回今天
     */
    goToday() {
      this.currentDate = this.isOpen
        ? this.getMonthStartEnd(this.newDate)
        : getWeekDate(new Date());
      this.$children[0].selectedDay = this.newDate;
    },
    /**
     * 获取月份开始结束
     */
    getMonthStartEnd(data) {
      let month = data.split("-")[1];
      // 月开始时间
      month = parseInt(month, 10) - 1;
      const startDate = moment()
        .month(month)
        .startOf("month")
        .format("YYYY-MM-DD");
      // 月结束时间
      const endDate = moment()
        .month(month)
        .endOf("month")
        .format("YYYY-MM-DD");
      return [startDate, endDate];
    },
    /**
     * 重写日期头部
     */
    rewriteTitle() {
      const title = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      const thead = document.querySelector(".el-calendar table thead");
      for (let i = 0, item; i < thead.children.length; i++) {
        item = thead.children[i].innerText = title[i];
      }
    }
  },
  mounted() {
    // 重写日历表格thead
    this.rewriteTitle();
    // 默认选中当前时间
    this.$children[0].selectedDay = this.newDate;
  }
};
</script>
<style lang="less" scoped>
.calendar-box {
  .calender-top {
    height: 91px;
    line-height: 91px;
    border-bottom: 1px solid #efefef;
    text-align: right;
    padding-right: 54px;
    color: #888888;
    font-size: 16px;
  }
  .calendar-content {
    display: flex;
    background: linear-gradient(
      0deg,
      rgba(248, 250, 255, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    .calendar-left {
      width: 75%;
    }
    .calendar-right {
      position: relative;
      width: 25%;
      padding-top: 12px;
      display: flex;
      .c-r-right {
        cursor: pointer;
        position: absolute;
        right: 54px;
        color: #888888;
        font-size: 16px;
      }
    }
  }
}

/deep/ .el-calendar {
  background: none;
}
/deep/ tr.el-calendar-table__row {
  td {
    border: none;
    .el-calendar-day {
      display: flex;
      justify-content: center;
      p {
        width: 40px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  p.is-selected {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #00a4ff;
    color: #fff;
    line-height: 40px;
  }
  td.next,
  td.prev {
    // visibility: hidden;
  }
  /deep/ .el-calendar-table td.is-selected {
    background: none;
  }
}
/deep/ .el-calendar__header {
  border-bottom: none;
}
/deep/ .el-calendar__header {
  // display: none;
}
</style>

