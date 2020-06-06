<template>
  <div class="goalstable-component component">
    <div class="grid-container header center">
      <p>Datum</p>
      <p>Typ</p>
      <p>Tid</p>
      <p>Uppnått</p>
      <p></p>
    </div>
    <div class="grid-container center" v-for="goal in goals" :key="goal.id">
      <p scope="row">{{ goal.date }}</p>
      <p>
        <i v-if="goal.type === 'run'" class="fas fa-running"></i>
        <i v-else-if="goal.type === 'swim'" class="fas fa-swimmer"></i>
        <i v-else-if="goal.type === 'ski'" class="fas fa-skiing-nordic"></i>
        <i v-else-if="goal.type === 'bicycle'" class="fas fa-biking"></i>
      </p>
      <p>{{ goal.duration }} min</p>
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
import { Goal } from "./../models/Goal";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "goalstable",
  data() {
    return {};
  },
  computed: {
    ...mapState(["goals"])
  },
  methods: {
    ...mapActions(["toggleAchieved", "deleteGoal"]),
    toggleAchievedInternal(goal: Goal) {
      this.toggleAchieved(goal);
    },
    deleteGoalInternal(goal: Goal) {
      this.deleteGoal(goal);
    }
  }
});
</script>

<style lang="scss">
.goalstable-component {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  .header {
    font-weight: bold;
  }
  .center {
    text-align: center;
  }
}
</style>