<template>
  <div class="dashboardheader-component component">
    <nav class="navbar navbar-dark bg-dark justify-content-center">
      <router-link :to="{ name: 'Dashboard' }" class="nav-link">Veckoliga mål</router-link>
      <router-link :to="{ name: 'AnnualGoals' }" class="nav-link">Årliga mål</router-link>
      <span class="nav-link" style="cursor:pointer" @click="logoutUser">Logga ut</span>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "dashboardheader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["logoutUser"])
  }
});
</script>

<style lang="scss">
.dashboardheader-component {
  .header {
    text-align: center;
  }
}
</style>