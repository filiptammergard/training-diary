<template>
  <div class="annualgoals-view view">
    <Navbar />
    <div class="container">
      <YearPicker />
      <CreateAnnualGoal />
      <AnnualGoalsTable />
      <GoalSummary />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import YearPicker from "@/components/annualGoals/YearPicker";
import CreateAnnualGoal from "@/components/annualGoals/CreateAnnualGoal";
import AnnualGoalsTable from "@/components/annualGoals/AnnualGoalsTable.vue";
import GoalSummary from "@/components/GoalSummary.vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "annualgoals",
  components: {
    Navbar,
    YearPicker,
    CreateAnnualGoal,
    AnnualGoalsTable,
    GoalSummary
  },
  created() {
    this.setYear(new Date().getFullYear());
    this.initAnnualGoalsListener();
    this.initSettingsListener();
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([
      "initAnnualGoalsListener",
      "setYear",
      "initSettingsListener"
    ])
  }
});
</script>
