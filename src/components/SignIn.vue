<template>
  <div class="signin-component component">
    <button class="btn btn-dark" @click="signInInternal">Logga in</button>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { auth } from "@/firebaseConfig";

export default {
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
};
</script>

<style lang="scss">
.signin-component {
  text-align: center;
}
</style>