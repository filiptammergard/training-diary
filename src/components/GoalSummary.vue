<template>
  <div class="goalsummary-component component">
    <div class="grid-container">
      <p>Antal mål: {{ numberOfGoals }}</p>
      <p>Total tid: {{ totalGoalDuration }} min</p>
      <p>Andel uppnådda mål: {{ achievedGoalsPercentage }} %</p>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from "vuex";
import { Type } from "../models/enums/type";

export default {
  name: "goalsummary",
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
  methods: {
    ...mapActions(["createGoal"])
  }
};
</script>

<style lang="scss">
.goalsummary-component {
  .grid-container {
    font-weight: bold;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>