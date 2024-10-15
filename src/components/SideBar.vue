<template>
  <v-card>
    <v-navigation-drawer
      :width="rail ? 256 : 56"
      :style="{ transition: 'width 0.3s ease' }"
      permanent
      @click="toggleRail"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="toggleRail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="My Account"
          value="account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Users"
          value="users"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const rail = computed({
      get: () => store.getters.rail,
      set: (value) => store.commit("setRail", value),
    });
    const toggleRail = () => {
      store.dispatch("toggleRail");
    };
    return {
      rail,
      toggleRail,
    };
  },
});
</script>

<style scoped></style>
