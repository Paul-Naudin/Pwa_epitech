<template>
  <v-card class="ma-3">
    <v-card-title>
      <h3 class="text-h3 text-center">{{ selectedTournament.name }}</h3>
    </v-card-title>
    <v-card-text>
      <p class="text-center">{{ selectedTournament.description }}</p>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-text class="text-center">
      Status:
      <v-chip color="primary">{{ selectedTournamentStatus }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TournamentBaseCard',
  computed: {
    ...mapGetters('tournaments', [
      'selectedTournament',
      'selectedTournamentStatus'
    ]),
  },
};
</script>