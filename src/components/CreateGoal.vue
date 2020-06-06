<template>
  <div class="creategoal-component component">
    <div class="grid-container">
      <input class="form-control" type="date" v-model="date" required />
      <select class="form-control" type="text" v-model="type" placeholder="Typ" required>
        <option value="run">Löpning</option>
        <option value="bicycle">Cykling</option>
        <option value="ski">Skidåkning</option>
        <option value="swim">Simning</option>
      </select>
      <input
        class="form-control"
        type="number"
        v-model.number="duration"
        placeholder="Tid"
        required
      />
      <button class="btn btn-dark" @click="createGoalInternal()">Lägg till</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { Type } from "../models/enums/Type";

export default Vue.extend({
  name: "creategoal",
  data() {
    return {
      date: "",
      type: Type.Run as Type,
      duration: null
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["createGoal"]),
    createGoalInternal(): void {
      this.createGoal({
        date: this.date,
        type: this.type,
        duration: this.duration,
        uid: this.user.uid
      });
    }
  }
});
</script>

<style lang="scss">
.creategoal-component {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
</style>