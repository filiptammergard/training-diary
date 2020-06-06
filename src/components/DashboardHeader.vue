<template>
  <div class="dashboardheader-component component">
    <h1 class="header">{{ user.displayName }}s träningsdagbok</h1>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
  name: "dashboardheader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions([])
  }
};
</script>

<style lang="scss">
.dashboardheader-component {
  .header {
    text-align: center;
  }
}
</style>