<template>
  <div class="navbar-component component">
    <nav class="navbar navbar-dark bg-dark d-flex justify-content-center">
      <router-link :to="{ name: 'Dashboard' }" class="nav-link">Veckoliga mål</router-link>
      <router-link :to="{ name: 'AnnualGoals' }" class="nav-link">Årliga mål</router-link>
      <router-link :to="{ name: 'Settings' }" class="nav-link">Inställningar</router-link>
      <span class="nav-link" style="cursor:pointer" @click="logoutUser">Logga ut</span>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "navbar",
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