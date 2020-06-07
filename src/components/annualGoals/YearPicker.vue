<template>
  <div class="yearpicker-component component center">
    <div class="grid-container">
      <button class="btn btn-dark" @click="previousYear()">Föregåede år</button>
      <h4>År {{ year }}</h4>
      <button class="btn btn-dark" @click="nextYear()">Nästa år</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "yearpicker",
  data() {
    return {};
  },
  computed: {
    ...mapState(["year"])
  },
  methods: {
    ...mapActions(["previousYear", "nextYear"])
  }
});
</script>

<style lang="scss">
.yearpicker-component {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>