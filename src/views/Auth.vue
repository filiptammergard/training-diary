<template>
  <div class="auth-view view container">
    <SignIn />
  </div>
</template>

<script>
import SignIn from "@/components/SignIn.vue";

export default {
  name: "auth",
  components: {
    SignIn
  }
};
</script>