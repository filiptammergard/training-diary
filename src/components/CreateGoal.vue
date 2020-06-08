<template>
  <div class="creategoal-component component">
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
            placeholder="Ange tid..."
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
  week: number;
  year: number;
  type: string;
}

export default Vue.extend({
  name: "creategoal",
  data() {
    return {
      type: "",
      numericGoal: null
    };
  },
  computed: {
    ...mapState(["user", "calendar", "goals"])
  },
  methods: {
    ...mapActions(["createGoal"]),
    createGoalInternal(): void {
      this.createGoal({
        type: this.type,
        numericGoal: this.numericGoal,
        uid: this.user.uid,
        fullDate: this.calendar.fullDate,
        week: this.calendar.week,
        month: this.calendar.month,
        year: this.calendar.year
      });
      this.type = "";
      this.numericGoal = null;
    },
    goalExists(type: string): boolean {
      const goalsInSameWeekSameYearWithSameType: Goal[] = this.goals.filter(
        (goal: Goal) =>
          goal.week === this.calendar.week &&
          goal.year === this.calendar.year &&
          goal.type === type
      );

      if (
        goalsInSameWeekSameYearWithSameType == undefined ||
        goalsInSameWeekSameYearWithSameType.length == 0
      )
        return false;
      return true;
    }
  }
});
</script>