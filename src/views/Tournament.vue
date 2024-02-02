<template>
  <InviteDialog />
  <TournamentBaseCard />
  <TournamentAdminCard v-if="this.selectedTournament.admin === this.uid"/>
  <v-row no-gutters v-if="this.selectedTournamentStatus !== 'open'">
    <v-col cols="12" md="8">
      <TournamentTable />
    </v-col>
    <v-col cols="12" md="4">
      <TournamentPlayer />
    </v-col>
  </v-row>
</template>

<script>
import TournamentBaseCard from '../components/tournament/TournamentBaseCard.vue';
import TournamentAdminCard from '../components/tournament/TournamentAdminCard.vue';
import TournamentTable from '../components/tournament/TournamentTable.vue';
import TournamentPlayer from '../components/tournament/TournamentPlayer.vue';
import InviteDialog from '../components/tournament/InviteDialog.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Tournament',
  components: {
    TournamentBaseCard,
    TournamentAdminCard,
    TournamentTable,
    TournamentPlayer,
    InviteDialog,
  },
  computed: {
    ...mapGetters('tournaments', [
      'selectedTournament',
      'selectedTournamentStatus',
    ]),
    ...mapGetters('user', {
      uid: 'uid',
    }),
  },
};
</script>