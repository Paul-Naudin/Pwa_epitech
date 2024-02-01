<template>
  <v-navigation-drawer v-model="localDrawer" app temporary>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'LeftDrawer',
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      localDrawer: false,
    };
  },
  watch: {
    drawer(newVal) {
      this.localDrawer = newVal;
    },
    localDrawer(newVal) {
      if (newVal !== this.drawer) {
        this.$emit('drawer-toggle', false);
      }
    },
  },
}
</script>