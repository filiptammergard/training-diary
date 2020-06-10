<template>
  <div class="statistics-view view">
    <Navbar />
    <div class="container">
      <GoalComparison />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Navbar from "@/components/Navbar";
import GoalComparison from "@/components/statistics/GoalComparison";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "statistics",
  components: {
    Navbar,
    GoalComparison
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([])
  }
});
</script>
