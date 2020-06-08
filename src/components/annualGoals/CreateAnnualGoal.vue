<template>
  <div class="createannualgoal-component component">
    <form class="d-flex justify-content-center" @submit.prevent="createGoalInternal()">
      <select class="form-control mr-3" type="text" v-model="type" placeholder="Typ" required>
        <option value selected disabled hidden>Välj typ...</option>
        <option value="run" :disabled="goalExists('run')">Löpning</option>
        <option value="bicycle" :disabled="goalExists('bicycle')">Cykling</option>
        <option value="ski" :disabled="goalExists('ski')">Skidåkning</option>
        <option value="swim" :disabled="goalExists('swim')">Simning</option>
      </select>
      <input
        class="form-control mr-3"
        type="number"
        v-model.number="distance"
        placeholder="Välj distans..."
        min="1"
        required
      />
      <button class="btn btn-dark" type="submit">Lägg till</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

interface Goal {
  year: number;
  type: string;
}

export default Vue.extend({
  name: "createannualgoal",
  data() {
    return {
      type: "",
      distance: null
    };
  },
  computed: {
    ...mapState(["user", "year", "annualGoals"])
  },
  methods: {
    ...mapActions(["createAnnualGoal"]),
    createGoalInternal(): void {
      this.createAnnualGoal({
        type: this.type,
        distance: this.distance,
        uid: this.user.uid,
        year: this.year
      });
      this.type = "";
      this.distance = null;
    },
    goalExists(type: any): boolean {
      const goalsInSameYearWithSameType = this.annualGoals.filter(
        (goal: Goal) => goal.year === this.year && goal.type === type
      );

      if (
        goalsInSameYearWithSameType == undefined ||
        goalsInSameYearWithSameType.length == 0
      )
        return false;
      return true;
    }
  }
});
</script>