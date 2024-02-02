<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">New Tournament</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newTournament.name" label="Tournament Name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newTournament.description" label="Description" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="createTournament">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-navigation-drawer v-model="localDrawer" app temporary>
    <template v-slot:prepend>
      <v-list-item>
        <v-btn block color="primary" class="mt-2 mb-2" @click="dialog = true">
          <v-icon left class="mr-2">mdi-plus</v-icon>
          New tournament
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
    </template>
    <v-list nav>
      <v-list-item v-for="tournament in tournaments" :key="tournament.id" link
        :active="selectedTournament && selectedTournament.id === tournament.id ? true : false"
        @click="selectTournament(tournament.id)">
        <v-list-item-title>{{ tournament.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import { realtimeDb } from "../firebase";
import { ref, get, set } from "firebase/database";

export default {
  name: 'LeftDrawer',
  emits: ['drawer-toggle'],
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      localDrawer: false,
      dialog: false,
      newTournament: {
        name: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters('tournaments', [
      'tournaments',
      'selectedTournament',
    ]),
    ...mapGetters('user', {
      tournamentIds: 'tournaments',
      uid: 'uid',
    }),
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
  methods: {
    async createTournament() {
      // TODO

      // TODO: create random id
      const id = Math.floor(Math.random() * 1000000).toString();

      // create tournament
      const tournament = {
        id,
        name: this.newTournament.name,
        description: this.newTournament.description,
        status: 'open',
        admin: this.uid,
      };

      // push tournament to realtime database
      try {
        const tournamentRef = ref(realtimeDb, `tournaments/${tournament.id}`);
        await set(tournamentRef, tournament);
      } catch (error) {
        await this.$store.dispatch('snackbar/showSnackbar', { message: error.message, color: 'error' });
        this.dialog = false;
      }

      // add tournament to user
      try {
        await this.$store.dispatch('user/addTournament', tournament.id);
      } catch (error) {
        await this.$store.dispatch('snackbar/showSnackbar', { message: error.message, color: 'error' });
        this.dialog = false;
      }

      // sync tournaments
      await this.$store.dispatch('tournaments/fetchTournaments', this.tournamentIds);

      // set selected tournament
      await this.$store.dispatch('tournaments/selectTournament', tournament.id);

      // close dialog
      this.dialog = false;
      await this.$store.dispatch('snackbar/showSnackbar', { message: 'Tournament created', color: 'success' });
    },
    async selectTournament(id) {
      // select tournament
      await this.$store.dispatch('tournaments/selectTournament', id);
      this.localDrawer = false;
    },
  },
}
</script>