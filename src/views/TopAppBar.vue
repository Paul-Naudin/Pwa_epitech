<template>
  <v-app-bar app>
    <v-btn icon @click="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>
  
<script>
export default {
  name: 'TopAppBar',
  props: {
    drawer: Boolean,
  },
  methods: {
    toggleDrawer() {
      this.$emit('drawer-toggle', !this.drawer);
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push('/authentication');
    },
  },
}
</script>