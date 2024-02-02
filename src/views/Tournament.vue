<template>
  <TournamentBaseCard />
  <TournamentAdminCard />
</template>

<script>
import TournamentBaseCard from '../components/tournament/TournamentBaseCard.vue';
import TournamentAdminCard from '../components/tournament/TournamentAdminCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Tournament',
  components: {
    TournamentBaseCard,
    TournamentAdminCard,
  },
  computed: {
    ...mapGetters('tournaments', [
      'selectedTournament',
    ]),
    ...mapGetters('user', {
      tournamentIds: 'tournaments',
      uid: 'uid',
    }),
  },
};
</script>