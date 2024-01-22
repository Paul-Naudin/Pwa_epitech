<template>
  <v-app-bar app>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>
  
<script>
export default {
  name: 'TopAppBar',
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push('/authentication');
    },
  },
}
</script>