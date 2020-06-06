<template>
  <div class="auth-view view container">
    <SignIn />
  </div>
</template>

<script>
import Vue from "vue";
import SignIn from "@/components/SignIn.vue";

export default Vue.extend({
  name: "auth",
  components: {
    SignIn
  }
});
</script>