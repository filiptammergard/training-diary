<template>
  <div class="calendarpicker-component component center">
    <div class="d-flex justify-content-center">
      <div></div>
      <h2>Vecka {{ calendar.week }} år {{ calendar.year }}</h2>
      <div></div>
    </div>
    <br />
    <div class="d-flex justify-content-center">
      <button class="btn btn-dark mr-3" @click="previousWeek()">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button class="btn btn-dark" @click="setCalendar(new Date())">Nuvarande vecka</button>
      <button class="btn btn-dark ml-3" @click="nextWeek()">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "calendarpicker",
  data() {
    return {};
  },
  computed: {
    ...mapState(["calendar"])
  },
  methods: {
    ...mapActions(["previousWeek", "nextWeek", "setCalendar"])
  }
});
</script>