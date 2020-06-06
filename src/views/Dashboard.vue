<template>
  <div class="dashboard-view view container">
    <DashboardHeader />
    <CreateGoal />
    <GoalsTable />
    <GoalSummary />
    <button class="btn btn-dark" hidden="true" @click="logoutUser">Logga ut</button>
  </div>
</template>

<script>
import DashboardHeader from "@/components/DashboardHeader.vue";
import CreateGoal from "@/components/CreateGoal.vue";
import GoalsTable from "@/components/GoalsTable.vue";
import GoalSummary from "@/components/GoalSummary.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "dashboard",
  components: {
    DashboardHeader,
    CreateGoal,
    GoalsTable,
    GoalSummary
  },
  created() {
    this.getGoals();
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions(["getGoals", "logoutUser"])
  }
};
</script>
