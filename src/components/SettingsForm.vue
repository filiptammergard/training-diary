<template>
  <div class="settingsform-component component">
    <form @submit.prevent="saveQuantityAndUnitInternal()" class="mb-3">
      <div class="form-row mb-3">
        <div class="col-md">
          <select
            class="form-control"
            type="text"
            v-model="quantityForWeek"
            placeholder="Typ"
            required
          >
            <option value disabled>Välj storhet för veckoliga mål...</option>
            <option value="Tid">Tid</option>
            <option value="Distans">Distans</option>
            <option value="Kalorier">Kalorier</option>
          </select>
        </div>
        <div class="col-md">
          <select
            class="form-control"
            type="text"
            v-model="unitForWeek"
            placeholder="Typ"
            required
            :disabled="quantityForWeekNotChosen"
          >
            <option value disabled>Välj enhet för veckoliga mål...</option>
            <option
              v-for="unit in unitsForQuantity(quantityForWeek)"
              :key="unit"
              :value="unit"
            >{{ unit }}</option>
          </select>
        </div>
      </div>

      <div class="form-row mb-3">
        <div class="col-md">
          <select class="form-control" type="text" v-model="quantityForYear" required>
            <option value disabled>Välj storhet för årliga mål...</option>
            <option value="Tid">Tid</option>
            <option value="Distans">Distans</option>
            <option value="Kalorier">Kalorier</option>
          </select>
        </div>
        <div class="col-md">
          <select
            class="form-control"
            type="text"
            v-model="unitForYear"
            required
            :disabled="quantityForYearNotChosen"
          >
            <option value disabled>Välj enhet för årliga mål...</option>
            <option
              v-for="unit in unitsForQuantity(quantityForYear)"
              :key="unit"
              :value="unit"
            >{{ unit }}</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md">
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
      unitForYear: ""
    };
  },
  computed: {
    ...mapState(["user"]),
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
    ...mapActions(["saveQuantityAndUnit"]),
    unitsForQuantity(quantity: string) {
      console.log(quantity);
      if (quantity === "Tid") return ["min", "h"];
      else if (quantity === "Distans") return ["km", "mil"];
      else if (quantity === "Kalorier") return ["kcal", "kJ"];
    },
    saveQuantityAndUnitInternal() {
      const payload = {
        weekGoal: {
          quantity: this.quantityForWeek,
          unit: this.unitForWeek
        },
        yearGoal: {
          quantity: this.quantityForYear,
          unit: this.unitForYear
        },
        uid: this.user.uid
      };
      this.saveQuantityAndUnit(payload);
    }
  }
});
</script>