<template>
  <div class="dashboard-view view">
    <Navbar />
    <div class="container">
      <CalendarPicker />
      <CreateGoal />
      <GoalsTable />
      <GoalSummary />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import CalendarPicker from "@/components/CalendarPicker.vue";
import CreateGoal from "@/components/CreateGoal.vue";
import GoalsTable from "@/components/GoalsTable.vue";
import GoalSummary from "@/components/GoalSummary.vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "dashboard",
  components: {
    Navbar,
    CalendarPicker,
    CreateGoal,
    GoalsTable,
    GoalSummary
  },
  created() {
    this.setCalendar(new Date());
    this.initGoalsListener();
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions(["initGoalsListener", "setCalendar"])
  }
});
</script>
