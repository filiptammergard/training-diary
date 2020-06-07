<template>
  <div class="calendarpicker-component component center">
    <div class="grid-container">
      <button class="btn btn-dark" @click="previousWeek()">Föregåede vecka</button>
      <h4>Vecka {{ calendar.week }}</h4>
      <button class="btn btn-dark" @click="nextWeek()">Nästa vecka</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "calendarpicker",
  data() {
    return {};
  },
  computed: {
    ...mapState(["calendar"])
  },
  methods: {
    ...mapActions(["previousWeek", "nextWeek"])
  }
});
</script>

<style lang="scss">
.calendarpicker-component {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>