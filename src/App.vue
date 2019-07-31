<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    storageFn(e) {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        if (e.storageArea.vuexxx == localStorage.getItem("vuexxx")) {
          return;
        }
        if (e.storageArea.vuexxx != undefined) {
          localStorage.setItem("vuexxx", e.storageArea.vuexxx);
          this.$store.replaceState(JSON.parse(e.storageArea.vuexxx));
        }
      } else {
        localStorage.setItem("vuexxx", e.storageArea.vuexxx);
        this.$store.replaceState(JSON.parse(e.storageArea.vuexxx));
      }
    }
  },
  created() {
    window.onbeforeunload = () => {
      const d = JSON.stringify(this.$store.state);
      localStorage.setItem("vuexxx", d);
    };
    window.addEventListener("storage", this.storageFn);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.storageFn);
    window.onbeforeunload = null;
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}
</style>
