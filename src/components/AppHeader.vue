<template>
  <div class="app-top-navigation"></div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>
<style scoped>
.app-top-navigation {
  display: flex;
  padding: 0.5rem;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: 3.5rem;
  border-bottom: 1px solid #bdc3c7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 25%);
  justify-content: space-between;
  background-color: white;
  width: 100%;
  z-index: 1000;
}
</style>
