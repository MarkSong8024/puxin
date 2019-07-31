<template>
  <el-calendar v-model="value"></el-calendar>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  },
  methods: {
    render(h, { node, data, store }) {
      debugger;
      return <div>11</div>;
    }
  }
};
</script>
