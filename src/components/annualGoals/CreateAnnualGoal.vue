<template>
  <div class="createannualgoal-component component">
    <form @submit.prevent="createGoalInternal()">
      <div class="form-row">
        <div class="col-md mb-3">
          <label for="type">Välj träningsform</label>
          <select
            class="form-control"
            type="text"
            v-model="type"
            placeholder="Typ"
            required
            id="type"
          >
            <option value disabled>Välj träningsform...</option>
            <option value="run" :disabled="goalExists('run')">Löpning</option>
            <option value="bicycle" :disabled="goalExists('bicycle')">Cykling</option>
            <option value="ski" :disabled="goalExists('ski')">Skidåkning</option>
            <option value="swim" :disabled="goalExists('swim')">Simning</option>
          </select>
        </div>
        <div class="col-md mb-3">
          <label
            for="distance"
          >Ange {{ settings.yearGoal != undefined ? settings.yearGoal.quantity.toLowerCase() : "" }}</label>
          <div class="input-group">
            <input
              class="form-control"
              type="number"
              v-model.number="numericGoal"
              :placeholder="settings.yearGoal != undefined ? 'Ange ' + settings.yearGoal.quantity.toLowerCase() + '...' : ''"
              min="1"
              required
              id="distance"
            />
            <div class="input-group-append">
              <div
                class="input-group-text"
              >{{ settings.yearGoal != undefined ? settings.yearGoal.unit : "" }}</div>
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
    ...mapState(["user", "year", "annualGoals", "settings"])
  },
  methods: {
    ...mapActions(["createAnnualGoal"]),
    createGoalInternal(): void {
      this.createAnnualGoal({
        type: this.type,
        numericGoal: this.numericGoal,
        unit: this.settings.yearGoal.unit,
        quantity: this.settings.yearGoal.quantity.toLowerCase(),
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