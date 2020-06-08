<template>
  <div class="createannualgoal-component component">
    <form @submit.prevent="createGoalInternal()">
      <div class="form-row">
        <div class="col-md mb-3">
          <select class="form-control" type="text" v-model="type" placeholder="Typ" required>
            <option value disabled>Välj typ...</option>
            <option value="run" :disabled="goalExists('run')">Löpning</option>
            <option value="bicycle" :disabled="goalExists('bicycle')">Cykling</option>
            <option value="ski" :disabled="goalExists('ski')">Skidåkning</option>
            <option value="swim" :disabled="goalExists('swim')">Simning</option>
          </select>
        </div>
        <div class="col-md mb-3">
          <input
            class="form-control"
            type="number"
            v-model.number="numericGoal"
            placeholder="Ange distans..."
            min="1"
            required
          />
        </div>
        <div class="col-m">
          <button class="btn btn-dark" type="submit">Lägg till</button>
        </div>
      </div>
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
      numericGoal: null
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
        numericGoal: this.numericGoal,
        uid: this.user.uid,
        year: this.year
      });
      this.type = "";
      this.numericGoal = null;
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