<template>
  <div class="goalcomparison-component component">
    <h2>Måljämförelse</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "goalcomparison",
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