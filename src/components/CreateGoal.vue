<template>
  <div class="creategoal-component component">
    <form class="d-flex justify-content-center" @submit.prevent="createInternalGoal()">
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
        v-model.number="duration"
        placeholder="Ange tid..."
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
  week: number;
  year: number;
  type: string;
}

export default Vue.extend({
  name: "creategoal",
  data() {
    return {
      type: "",
      duration: null
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
        duration: this.duration,
        uid: this.user.uid,
        fullDate: this.calendar.fullDate,
        week: this.calendar.week,
        month: this.calendar.month,
        year: this.calendar.year
      });
      this.type = "";
      this.duration = null;
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