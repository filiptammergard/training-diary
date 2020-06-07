<template>
  <div class="signin-component component">
    <div>
      <button class="btn btn-dark" @click="signInInternal">Logga in</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { auth } from "@/firebaseConfig";

export default Vue.extend({
  name: "signin",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["signIn"]),
    signInInternal() {
      this.signIn();
    }
  }
});
</script>

<style lang="scss">
.signin-component {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>