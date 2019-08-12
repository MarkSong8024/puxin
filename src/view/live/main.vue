<template>
  <div class="live-class-box">
    <myCalendar></myCalendar>
  </div>
</template>
<script>
import myCalendar from "./myCalendar";
export default {
  components: { myCalendar }
};
</script>
<style lang="less" scoped>
.live-class-box {
  margin-left: 335px;
}
@media (max-width: 1440px) {
  .live-class-box {
    margin-left: 249px;
  }
}
</style>

