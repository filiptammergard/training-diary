<template>
  <div class="goalstable-component component">
    <div class="row bold center">
      <p class="col">Typ</p>
      <p class="col">Tid</p>
      <p class="col">Uppnått</p>
      <p class="col"></p>
    </div>
    <div class="row center" v-for="goal in goals" :key="goal.id">
      <p class="col">
        <i v-if="goal.type === 'run'" class="fas fa-running"></i>
        <i v-else-if="goal.type === 'swim'" class="fas fa-swimmer"></i>
        <i v-else-if="goal.type === 'ski'" class="fas fa-skiing-nordic"></i>
        <i v-else-if="goal.type === 'bicycle'" class="fas fa-biking"></i>
      </p>
      <p class="col">{{ goal.numericGoal }} min</p>
      <p class="col">
        <input type="checkbox" :checked="goal.achieved" @click="toggleAchievedInternal(goal)" />
      </p>
      <p class="col">
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
  achieved: boolean;
  numericGoal: number;
  type: string;
  uid: string;
}

export default Vue.extend({
  name: "goalstable",
  data() {
    return {};
  },
  computed: {
    ...mapState(["goals", "calendar"])
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