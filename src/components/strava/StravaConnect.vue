<template>
  <div class="stravaconnect-component component">
    <h2>Koppla Strava till ditt konto</h2>
    <button class="btn btn-dark">Koppla Strava</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "stravaconnect",
  data() {
    return {};
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([])
  }
});
</script>