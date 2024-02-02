import { db, realtimeDb } from "../firebase";
import { ref, get, set } from "firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { get as getidb, set as setidb } from 'idb-keyval';

export default {
    namespaced: true,
    state: {
        tournaments: null,
        selectedTournament: null,
    },
    getters: {
        tournaments(state) {
            return state.tournaments;
        },
        selectedTournament(state) {
            return state.selectedTournament;
        },
        selectedTournamentStatus(state) {
            if (!state.selectedTournament || !state.selectedTournament.status) {
                return null;
            }
            return state.selectedTournament.status;
        },
        selectedTournamentPlayers(state) {
            if (!state.selectedTournament || !state.selectedTournament.players) {
                return [];
            }
            return state.selectedTournament.players;
        }
    },
    mutations: {
        setTournaments(state, tournaments) { state.tournaments = tournaments; },
        setSelectedTournament(state, id) {
            if (!id || !state.tournaments) {
                return;
            }
            state.selectedTournament = state.tournaments.find(tournament => tournament.id === id);
        },
    },
    actions: {
        async addPlayerToTournament(state, playerUid) {

            // Get the selected tournament
            const tournament = state.getters.selectedTournament;
            if (!tournament.players) {
                tournament.players = [];
            }

            // Get the player
            const playerDoc = doc(db, "users", playerUid);
            const playerSnapshot = await getDoc(playerDoc);
            const player = playerSnapshot.data();

            // Add the player to the tournament
            tournament.players.push({ uid: playerUid, score: 0, username: player.username });

            // Update the player's tournaments
            if (!player.tournaments) {
                player.tournaments = [state.getters.selectedTournament.id];
                console.log('Player didn\'t have any tournaments')
            } else if (!player.tournaments.includes(state.getters.selectedTournament.id)) {
                player.tournaments.push(state.getters.selectedTournament.id);
                console.log('Player didn\'t have this tournament');
            }
            await setDoc(playerDoc, player);

            // Update the realtimeDb tournament
            await state.dispatch('updateTournament', tournament);
        },
        async updateTournament(state, tournament) {
            const tournamentRef = ref(realtimeDb, `tournaments/${tournament.id}`);
            await set(tournamentRef, tournament);
        },
        async selectTournament(state, id) {
            state.commit('setSelectedTournament', id);
            await setidb('selectedTournament', id);
        },
        async fetchTournaments(state, ids) {
            if (!ids) {
                return;
            }
            const tournaments = [];
            for (const id of ids) {
                const tournamentRef = ref(realtimeDb, `tournaments/${id}`);
                const snapshot = await get(tournamentRef);
                tournaments.push(snapshot.val());
            }
            state.commit('setTournaments', tournaments);
        },
        async loadSelectedTournament(state) {
            const snapshot = await getidb('selectedTournament');
            if (snapshot) {
                state.commit('setSelectedTournament', snapshot);
                return;
            }
        },
    },
}