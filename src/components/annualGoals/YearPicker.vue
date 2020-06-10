<template>
  <div class="yearpicker-component component center">
    <div class="d-flex justify-content-center">
      <div></div>
      <h2>År {{ year }}</h2>
      <div></div>
    </div>
    <br />
    <div class="d-flex justify-content-center">
      <button class="btn btn-dark mr-3" @click="previousYear()">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button class="btn btn-dark" @click="setYear(new Date().getFullYear())">Nuvarande år</button>
      <button class="btn btn-dark ml-3" @click="nextYear()">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "yearpicker",
  data() {
    return {};
  },
  computed: {
    ...mapState(["year"])
  },
  methods: {
    ...mapActions(["previousYear", "nextYear", "setYear"])
  }
});
</script>