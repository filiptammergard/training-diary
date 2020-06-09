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
            @change="getValidUnitsForQuantity(quantityForWeek)"
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
            <option v-for="unit in units" :value="unit">{{ unit }}</option>
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
      unitForWeek: "",
      units: [] as any
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
    getValidUnitsForQuantity(quantityForWeek: string) {
      if (quantityForWeek === "time") this.units = ["min", "h"];
      else if (quantityForWeek === "distance") this.units = ["km", "mil"];
      else if (this.quantityForWeek === "calories") this.units = ["kcal", "kJ"];
    }
  }
});
</script>