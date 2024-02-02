
<template>
  <v-app>
    <Snackbar />
    <router-view />
  </v-app>
</template>

<script>
import Snackbar from "./components/ui/Snackbar.vue";

export default {
  components: {
    Snackbar,
  },
};
</script>