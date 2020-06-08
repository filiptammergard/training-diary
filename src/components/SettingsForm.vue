<template>
  <div class="settingsform-component component">
    <form @submit.prevent="createGoalInternal()">
      <div class="form-row">
        <div class="col-md mb-3">
          <select
            class="form-control"
            type="text"
            v-model="quantityForWeek"
            placeholder="Typ"
            required
          >
            <option value disabled>Välj storhet för veckoliga mål...</option>
            <option value="time">Tid</option>
            <option value="distance">Distans</option>
            <option value="calories">Kalorier</option>
          </select>
        </div>
        <div class="col-md mb-3">
          <select
            class="form-control"
            type="text"
            v-model="unitForWeek"
            placeholder="Typ"
            required
            :disabled="quantityForWeekNotChosen"
          >
            <option value disabled>Välj enhet för veckoliga mål...</option>
            <option value="min" :hidden="isInvalidUnitForWeek('min')">min</option>
            <option value="h" :hidden="isInvalidUnitForWeek('h')">h</option>
            <option value="km" :hidden="isInvalidUnitForWeek('km')">km</option>
            <option value="mil" :hidden="isInvalidUnitForWeek('mil')">mil</option>
            <option value="kcal" :hidden="isInvalidUnitForWeek('kcal')">kcal</option>
            <option value="kJ" :hidden="isInvalidUnitForWeek('kJ')">kJ</option>
          </select>
        </div>
        <div class="col-m">
          <button class="btn btn-dark" type="submit">Spara</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "settingsform",
  data() {
    return {
      quantityForWeek: "",
      unitForWeek: ""
    };
  },
  computed: {
    ...mapState(["user", "calendar", "goals"]),
    quantityForWeekNotChosen() {
      if (this.quantityForWeek === "") return true;
      return false;
    }
  },
  methods: {
    ...mapActions([]),
    isInvalidUnitForWeek(unit: string) {
      if (this.quantityForWeek === "time" && (unit === "min" || unit === "h"))
        return false;
      else if (
        this.quantityForWeek === "distance" &&
        (unit === "km" || unit === "mil")
      )
        return false;
      else if (
        this.quantityForWeek === "calories" &&
        (unit === "kcal" || unit === "kJ")
      )
        return false;
      return true;
    }
  }
});
</script>