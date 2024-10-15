<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import SideBar from "./components/SideBar.vue";
import AppHeader from "./components/AppHeader.vue";
const store = useStore();
const rail = computed(() => store.getters.rail);
const widthToReduce = computed(() => (rail.value ? 256 : 56));
const appContentStyle = computed(() => ({
  width: `calc(100% - ${widthToReduce.value}px)`,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "inherit",
  position: "absolute",
  top: 0,
  right: 0,
}));
</script>

<template>
  <v-app>
    <SideBar />
    <div :style="appContentStyle">
      <div style="flex-grow: 0; flex-basis: 10%">
        <AppHeader />
      </div>
      <div style="flex-grow: 0; flex-basis: 90%"></div>
    </div>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
