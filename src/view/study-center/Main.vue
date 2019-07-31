<template>
  <div class="main-page">
    <List></List>
    <router-view :key="$router.fullPath"></router-view>
  </div>
</template>

<script>
import List from "./List";
import { install } from "../../utils/bus";
export default {
  components: {
    List
  }
};
</script>

<style lang="less" scoped>
.main-page {
  display: flex;
  .main-right {
    margin-left: 335px;
  }
}
</style>

