<template>
  <div class="creategoal-component component">
    <form @submit.prevent="createGoalInternal()">
      <div class="form-row">
        <div class="col-md mb-3">
          <label for="quantoty">Välj träningsform</label>
          <select class="form-control" type="text" v-model="type" placeholder="Typ" required>
            <option value disabled>Välj träningsform...</option>
            <option value="run" :disabled="goalExists('run')">Löpning</option>
            <option value="bicycle" :disabled="goalExists('bicycle')">Cykling</option>
            <option value="ski" :disabled="goalExists('ski')">Skidåkning</option>
            <option value="swim" :disabled="goalExists('swim')">Simning</option>
          </select>
        </div>
        <div class="col-md mb-3">
          <label
            for="unit"
          >Ange {{ settings.weekGoal != undefined ? settings.weekGoal.quantity.toLowerCase() : "" }}</label>
          <div class="input-group">
            <input
              class="form-control"
              type="number"
              v-model.number="numericGoal"
              :placeholder="settings.weekGoal != undefined ? 'Ange ' + settings.weekGoal.quantity.toLowerCase() + '...' : ''"
              min="1"
              required
              id="unit"
            />
            <div class="input-group-append">
              <div
                class="input-group-text"
              >{{ settings.weekGoal != undefined ? settings.weekGoal.unit : "" }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-m">
        <button class="btn btn-dark" type="submit">Lägg till träningsmål</button>
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
    ...mapState(["user", "calendar", "goals", "settings"])
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
        year: this.calendar.year,
        unit: this.settings.weekGoal.unit,
        quantity: this.settings.weekGoal.quantity.toLowerCase()
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