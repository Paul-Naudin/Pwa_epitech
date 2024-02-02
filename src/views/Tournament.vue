<template>
  <v-card class="ma-2">
    <v-card-title>
          <h2 class="text-h3 text-center">{{ selectedTournament.name }}</h2>
    </v-card-title>
    <v-card-text>
      <p class="text-center">{{ selectedTournament.description }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Tournament',
  computed: {
    ...mapGetters('tournaments', [
      'selectedTournament',
    ]),
  },
};
</script>