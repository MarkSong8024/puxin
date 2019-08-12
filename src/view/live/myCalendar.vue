<template>
  <div class="calendar-box">
    <div class="calender-top">
      <span class="el-icon-arrow-left"></span>
      <span class="go-day" @click="goToday">回到今天</span>
    </div>
    <div class="calendar-content">
      <div class="calendar-left" :class="{'hidden-other':isOpen}">
        <el-calendar :range="currentDate">
          <template slot="dateCell" slot-scope="{date, data}">
            {{setYearMonth(data)}}
            <p :class="data.isSelected ? 'is-selected' : ''">{{data.day|getDate}}</p>
          </template>
        </el-calendar>
      </div>
      <div class="calendar-right">
        <div class="cal-top">
          <div class="c-r-left">
            <span class="el-icon-arrow-left" @click="changeDate('prev')"></span>
            <span class="year-no-select">{{yearMonth}}</span>
            <span class="el-icon-arrow-right" @click="changeDate('last')"></span>
          </div>
          <div class="c-r-right" @click="showCurrentDate">
            <span>{{isOpen? '收起': '展开'}}日历</span>
            <span :class="[isOpen?'el-icon-arrow-up' : 'el-icon-arrow-down']"></span>
          </div>
        </div>
        <div class="show-day-week">
          <span class="date-num">{{new Date(selectedDay).getTime()|filTime('dd', '1')}}</span>
          <span class="week-num">周{{new Date(selectedDay).getTime()|filTime('week', '1')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeekDate, filTime } from "../../utils/filter";
import moment from "moment";
export default {
  data() {
    return {
      isOpen: false, // 日历是否打开
      newDate: moment().format("YYYY-MM-DD"), // 当前时间
      currentDate: getWeekDate(new Date()), // 获取本周时间
      yearMonth: "", // xxxx年xx月
      selectedDay: "" // 选中的日期
    };
  },
  methods: {
    /**
     * 设置年月
     */
    setYearMonth(data) {
      if (data.isSelected) {
        this.selectedDay = data.day;
        this.yearMonth = filTime(new Date(data.day).getTime(), "yy-mm", "1");
      }
    },
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
        this.isShowBottom();
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
      this.isShowBottom();
    },
    /**
     * 获取月份开始结束
     */
    getMonthStartEnd(data) {
      let month = data.split("-")[1];
      // 月开始时间
      month = parseInt(month, 10) - 1;
      const startDate = moment(data)
        .month(month)
        .startOf("month")
        .format("YYYY-MM-DD");
      // 月结束时间
      const endDate = moment(data)
        .month(month)
        .endOf("month")
        .format("YYYY-MM-DD");
      return [startDate, endDate];
    },
    /**
     * 改变时间
     */
    changeDate(type) {
      // let data = moment(this.selectedDay)
      //   [type === "prev" ? "subtract" : "add"](1, "months")
      //   .format("YYYY-MM-DD");
      // const dataList = this.getMonthStartEnd(data);
      // this.currentDate = this.isOpen
      //   ? dataList
      //   : getWeekDate(new Date(dataList[0]));
      // this.$children[0].selectedDay = dataList[0];

      // 获取时间值
      let date = this.isOpen
        ? moment(this.selectedDay)
            [type === "prev" ? "subtract" : "add"](1, "months")
            .format("YYYY-MM-DD")
        : moment(this.selectedDay)
            [type === "prev" ? "subtract" : "add"](7, "days")
            .format("YYYY-MM-DD");
      // 获取开始月至结束月+
      const dataList = this.getMonthStartEnd(date);
      // 获取开始周至结束周
      const weekList = getWeekDate(new Date(date));
      // 赋值
      this.currentDate = this.isOpen ? dataList : weekList;
      // 默认选中
      this.$children[0].selectedDay = date;
      this.isShowBottom();
    },
    /**
     * 重写日期头部
     */
    rewriteTitle() {
      const title = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      const thead = document.querySelector(".el-calendar table thead");
      for (let i = 0; i < thead.children.length; i++) {
        thead.children[i].innerText = title[i];
      }
    },
    /**
     * 是否显示底部
     */
    isShowBottom() {
      this.$nextTick(() => {
        const calendarRow = document.querySelectorAll(
          ".el-calendar-table__row"
        );
        const lastCalendarRow = calendarRow[calendarRow.length - 1];
        const isHidden = [...lastCalendarRow.children].every(
          item => item.className === "next"
        );
        lastCalendarRow.style.display = isHidden ? "none" : "";
      });
    }
  },
  mounted() {
    // 重写日历表格thead
    this.rewriteTitle();
    // 默认选中当前时间
    this.$children[0].selectedDay = this.newDate;
  },
  filters: {
    getDate(val) {
      const newDate = moment().format("YYYY-MM-DD");
      return val === newDate ? "今" : val.split("-")[2];
    }
  }
};
</script>
<style lang="less" scoped>
.calendar-box {
  .calender-top {
    height: 91px;
    line-height: 91px;
    border-bottom: 1px solid #efefef;
    padding-right: 54px;
    color: #888888;
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
    .el-icon-arrow-left {
      cursor: pointer;
      line-height: 91px;
    }
    .go-day {
      cursor: pointer;
    }
  }
  .calendar-content {
    display: flex;
    background: linear-gradient(
      0deg,
      rgba(248, 250, 255, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    .calendar-left {
      user-select: none;
      width: 75%;
    }
    .hidden-other {
      /deep/ .el-calendar-table__row {
        .prev,
        .next {
          visibility: hidden;
        }
      }
    }
    .calendar-right {
      position: relative;
      width: 25%;
      padding-top: 12px;
      display: flex;
      .c-r-left {
        .el-icon-arrow-left,
        .el-icon-arrow-right {
          cursor: pointer;
          user-select: none;
        }
        .year-no-select {
          font-size: 20px;
          font-weight: 500;
          color: #333333;
          user-select: none;
        }
      }
      .c-r-right {
        user-select: none;
        cursor: pointer;
        position: absolute;
        right: 54px;
        color: #888888;
        font-size: 16px;
      }
      .show-day-week {
        color: #666666;
        user-select: none;
        .date-num {
          font-size: 80px;
          font-family: ArialRoundedMTBold;
        }
        .week-num {
          font-size: 20px;
          font-family: PingFangSC-Medium;
        }
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
  /deep/ .el-calendar-table td.is-selected {
    background: none;
  }
}
/deep/ .el-calendar__header {
  border-bottom: none;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>

