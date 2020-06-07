<template>
  <div class="annualgoalstable-component component">
    <div class="grid-container header center">
      <p>Typ</p>
      <p>Distans</p>
      <p>Uppnått</p>
      <p></p>
    </div>
    <div class="grid-container center" v-for="goal in annualGoals" :key="goal.id">
      <p>
        <i v-if="goal.type === 'run'" class="fas fa-running"></i>
        <i v-else-if="goal.type === 'swim'" class="fas fa-swimmer"></i>
        <i v-else-if="goal.type === 'ski'" class="fas fa-skiing-nordic"></i>
        <i v-else-if="goal.type === 'bicycle'" class="fas fa-biking"></i>
      </p>
      <p>{{ goal.distance }} mil</p>
      <p>
        <input type="checkbox" :checked="goal.achieved" @click="toggleAchievedInternal(goal)" />
      </p>
      <p>
        <button class="btn btn-danger btn-sm" @click="deleteGoalInternal(goal)">Ta bort</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

interface Goal {
  id: string;
  date: string;
  achieved: boolean;
  duration: number;
  intensity: number;
  type: string;
  uid: string;
}

export default Vue.extend({
  name: "annualgoalstable",
  data() {
    return {};
  },
  computed: {
    ...mapState(["annualGoals", "year"])
  },
  methods: {
    ...mapActions(["toggleAchieved", "deleteAnnualGoal"]),
    toggleAchievedInternal(goal: Goal) {
      this.toggleAchieved(goal);
    },
    deleteGoalInternal(goal: Goal) {
      this.deleteAnnualGoal(goal);
    }
  }
});
</script>

<style lang="scss">
.annualgoalstable-component {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  .header {
    font-weight: bold;
  }
}
</style>