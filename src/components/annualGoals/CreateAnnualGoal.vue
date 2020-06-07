<template>
  <div class="createannualgoal-component component">
    <div class="grid-container">
      <select class="form-control" type="text" v-model="type" placeholder="Typ" required>
        <option value>Välj typ...</option>
        <option value="run">Löpning</option>
        <option value="bicycle">Cykling</option>
        <option value="ski">Skidåkning</option>
        <option value="swim">Simning</option>
      </select>
      <input
        class="form-control"
        type="number"
        v-model.number="distance"
        placeholder="Välj distans..."
        required
      />
      <button class="btn btn-dark" @click="createGoalInternal()">Lägg till</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "createannualgoal",
  data() {
    return {
      date: "",
      type: "",
      distance: null
    };
  },
  computed: {
    ...mapState(["user", "year"])
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
    }
  }
});
</script>

<style lang="scss">
.createannualgoal-component {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
</style>