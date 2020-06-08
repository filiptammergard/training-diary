<template>
  <div class="settings-view view">
    <Navbar />
    <div class="container">
      <SettingsForm />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Navbar from "@/components/Navbar";
import SettingsForm from "@/components/SettingsForm";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "settings",
  components: {
    Navbar,
    SettingsForm
  },
  created() {},
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapActions([])
  }
});
</script>
