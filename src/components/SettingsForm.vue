<template>
  <div class="settingsform-component component">
    <form @submit.prevent="saveQuantityAndUnitForWeekInternal()">
      <div class="form-row">
        <div class="col-md mb-3">
          <select
            class="form-control"
            type="text"
            v-model="quantityForWeek"
            placeholder="Typ"
            required
            @change="getValidUnitsForQuantityForWeek(quantityForWeek)"
          >
            <option value disabled>Välj storhet för veckoliga mål...</option>
            <option value="Tid">Tid</option>
            <option value="Distans">Distans</option>
            <option value="Kalorier">Kalorier</option>
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
            <option v-for="unit in unitsForWeek" :key="unit" :value="unit">{{ unit }}</option>
          </select>
        </div>
        <div class="col-m">
          <button class="btn btn-dark" type="submit">Spara</button>
        </div>
      </div>
    </form>

    <form @submit.prevent="saveQuantityAndUnitForYearInternal()">
      <div class="form-row">
        <div class="col-md mb-3">
          <select
            class="form-control"
            type="text"
            v-model="quantityForYear"
            placeholder="Typ"
            required
            @change="getValidUnitsForQuantityForYear(quantityForYear)"
          >
            <option value disabled>Välj storhet för årliga mål...</option>
            <option value="Tid">Tid</option>
            <option value="Distans">Distans</option>
            <option value="Kalorier">Kalorier</option>
          </select>
        </div>
        <div class="col-md mb-3">
          <select
            class="form-control"
            type="text"
            v-model="quantityForYear"
            placeholder="Typ"
            required
            :disabled="quantityForYearNotChosen"
          >
            <option value disabled>Välj enhet för årliga mål...</option>
            <option v-for="unit in unitsForYear" :key="unit" :value="unit">{{ unit }}</option>
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
      quantityForYear: "",
      unitForYear: "",
      unitsForWeek: [] as any,
      unitsForYear: [] as any
    };
  },
  computed: {
    ...mapState(["user", "calendar", "goals"]),
    quantityForWeekNotChosen() {
      if (this.quantityForWeek === "") return true;
      return false;
    },
    quantityForYearNotChosen() {
      if (this.quantityForYear === "") return true;
      return false;
    }
  },
  methods: {
    ...mapActions(["saveQuantityAndUnitForWeek", "saveQuantityAndUnitForYear"]),
    getValidUnitsForQuantityForWeek(quantity: string) {
      this.unitForWeek = "";
      if (quantity === "Tid") this.unitsForWeek = ["min", "h"];
      else if (quantity === "Distans") this.unitsForWeek = ["km", "mil"];
      else if (quantity === "Kalorier") this.unitsForWeek = ["kcal", "kJ"];
    },
    getValidUnitsForQuantityForYear(quantity: string) {
      this.unitForYear = "";
      if (quantity === "Tid") this.unitsForYear = ["min", "h"];
      else if (quantity === "Distans") this.unitsForYear = ["km", "mil"];
      else if (quantity === "Kalorier") this.unitsForYear = ["kcal", "kJ"];
    },
    saveQuantityAndUnitForWeekInternal() {
      const settings = {
        quantity: this.quantityForWeek,
        unit: this.unitForWeek,
        userid: this.user.uid
      };
      this.saveQuantityAndUnitForWeek(settings);
    },
    saveQuantityAndUnitForYearInternal() {
      const settings = {
        quantity: this.quantityForYear,
        unit: this.unitForYear,
        userid: this.user.uid
      };
      this.saveQuantityAndUnitForYear(settings);
    }
  }
});
</script>