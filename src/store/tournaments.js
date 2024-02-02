import { db, realtimeDb } from "../firebase";
import { ref, get, set, child } from "firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { get as getidb, set as setidb } from 'idb-keyval';

export default {
    namespaced: true,
    state: {
        tournaments: null,
        selectedTournament: null,
        invite: null,
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
        },
        invite(state) {
            return state.invite;
        },
    },
    mutations: {
        setTournaments(state, tournaments) { state.tournaments = tournaments; },
        setSelectedTournament(state, id) {
            if (!id || !state.tournaments) {
                return;
            }
            state.selectedTournament = state.tournaments.find(tournament => tournament.id === id);
        },
        setInvite(state, invite) {
            state.invite = invite;
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
            if (tournament.players.some(player => player.uid === playerUid)) {
                return;
            }
            tournament.players.push({ uid: playerUid, score: 0, username: player.username });

            // Update the player's tournaments
            if (!player.tournaments) {
                player.tournaments = [state.getters.selectedTournament.id];
            } else if (!player.tournaments.includes(state.getters.selectedTournament.id)) {
                player.tournaments.push(state.getters.selectedTournament.id);
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
        async fetchTournaments(state) {
            const dbRef = ref(realtimeDb);
            const tournamentsRef = child(dbRef, 'tournaments');
            const snapshot = await get(tournamentsRef);

            if (snapshot.exists()) {
                const tournaments = snapshot.val();
                const tournamentsArray = Object.keys(tournaments).map(id => ({ ...tournaments[id], id }));
                state.commit('setTournaments', tournamentsArray);
            }
        },
        async loadSelectedTournament(state) {
            const snapshot = await getidb('selectedTournament');
            if (snapshot) {
                state.commit('setSelectedTournament', snapshot);
                return;
            }
        },
        async setInvite(state, invite) {
            await state.dispatch('fetchTournaments');
            state.getters.tournaments.forEach(tournament => {
                if (tournament.id === invite.tournamentId) {
                    state.commit('setInvite', {
                        username: invite.host,
                        tournamentName: tournament.name,
                        tournamentDescription: tournament.description,
                        tournamentId: invite.tournamentId,
                    });
                    state.commit('setSelectedTournament', invite.tournamentId);
                }
            });
        },
        removeInvite(state) {
            state.commit('setInvite', null);
        },
    },
}