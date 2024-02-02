<template>
  <v-snackbar v-model="snackbarModel" :color="color" timeout="5000">
    {{ message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="close">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('snackbar', [
      'message',
      'color',
      'show',
    ]),
    snackbarModel: {
      get() {
        return this.show;
      },
      set(value) {
        this.setShow(value);
      },
    },
  },
  methods: {
    ...mapMutations('snackbar', ['setShow']),
    close() {
      this.setShow(false);
    },
  },
};
</script>