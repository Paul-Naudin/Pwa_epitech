
<template>
  <v-app>
    <LoginSnackbar />
    <router-view />
  </v-app>
</template>

<script>
import LoginSnackbar from "./components/ui/LoginSnackbar.vue";

export default {
  components: {
    LoginSnackbar,
  },
};
</script>