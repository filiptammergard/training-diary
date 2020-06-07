<template>
  <div class="annualgoalsummary-component component">
    <div class="grid-container">
      <p>Antal mål: {{ numberOfGoals }}</p>
      <p>Total tid: {{ totalGoalDuration }} min</p>
      <p>Andel uppnådda mål: {{ achievedGoalsPercentage }} %</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "annualgoalsummary",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "goalSummary"]),
    ...mapGetters([
      "numberOfGoals",
      "totalGoalDuration",
      "achievedGoalsPercentage"
    ])
  },
  methods: {}
});
</script>

<style lang="scss">
.annualgoalsummary-component {
  .grid-container {
    font-weight: bold;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>