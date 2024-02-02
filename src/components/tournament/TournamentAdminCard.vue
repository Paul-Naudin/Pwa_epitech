<template>
  <v-card class="ma-3">
    <v-card-title class="text-h5 text-center">
      Admin view
    </v-card-title>
    <v-card-text class="text-center">
      Players
      <v-list>
        <v-list-item v-for="(player, index) in selectedTournamentPlayers" :key="index">{{ player.username }}</v-list-item>
      </v-list>
      <v-btn v-if="!selectedTournamentPlayers.find(v => v && v.uid === uid)" class="ma-2" color="secondary" @click="joinTournament">Join as a player</v-btn>
      <v-btn class="ma-2" color="primary" @click="invite">Invite</v-btn>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="error" v-if="selectedTournamentStatus !== 'ongoing'" @click="deleteTournament">Delete</v-btn>
      <v-btn color="primary" v-if="selectedTournamentStatus === 'open'" @click="startTournament">Start</v-btn>
      <v-btn color="error" v-if="selectedTournamentStatus === 'ongoing'" @click="endTournament">End</v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TournamentAdminCard',
  computed: {
    ...mapGetters('tournaments', [
      'selectedTournament',
      'selectedTournamentStatus',
      'selectedTournamentPlayers'
    ]),
    ...mapGetters('user', {
      uid: 'uid',
      username: 'username',
    }),
  },
  methods: {
    startTournament() {
      // TODO: start tournament
      console.log('start tournament');
    },
    endTournament() {
      // TODO: end tournament
      console.log('end tournament');
    },
    deleteTournament() {
      // TODO: delete tournament
      console.log('delete tournament');
    },
    invite() {
      // Copy the invite url to the clipboard
      console.log('invite players:', window.location.href + "invite?tournamentId=" + this.selectedTournament.id + "&host=" + this.username);

      navigator.clipboard.writeText(window.location.href + "invite?tournamentId=" + this.selectedTournament.id + "&host=" + this.username);
      this.$store.dispatch('snackbar/showSnackbar', {
        message: 'Copied to clipboard',
        color: 'success',
      });
    },
    async joinTournament() {
      await this.$store.dispatch('tournaments/addPlayerToTournament', this.uid);
      await this.$store.dispatch('snackbar/showSnackbar', {
        message: 'Joined tournament',
        color: 'success',
      });
    },
  },
};
</script>