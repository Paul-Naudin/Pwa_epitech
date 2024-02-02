
<template>
  <v-dialog v-model="dialog" persistent>
    <v-card v-if="this.invite">
      <v-card-title>
        <span class="headline">{{ invite.username }} Invited you to join this tournament:</span>
      </v-card-title>
      <v-card-text>
        {{ invite.tournamentName }}
      </v-card-text>
      <v-card-text>
        {{ invite.tournamentDescription }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="ignoreInvite">Ignore</v-btn>
        <v-btn color="primary" text @click="joinTournament">Join</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'InviteDialog',
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('tournaments', [
      'invite',
    ]),
    ...mapGetters('user', {
      uid: 'uid',
    }),
  },
  methods: {
    async joinTournament() {
      await this.$store.dispatch('tournaments/addPlayerToTournament', this.uid);
      await this.$store.dispatch('tournaments/removeInvite');
      this.dialog = false;
      await this.$store.dispatch('snackbar/showSnackbar', {
        message: 'Joined tournament',
        color: 'success',
      });
    },
    async ignoreInvite() {
      await this.$store.dispatch('tournaments/removeInvite');
      this.dialog = false;
    },
  },
  watch: {
    invite(newVal) {
      if (newVal) {
        this.dialog = true;
      } else {
        this.dialog = false;
      }
    },
  },
  mounted() {
    if (this.invite) {
      this.dialog = true;
    }
  },
};
</script>