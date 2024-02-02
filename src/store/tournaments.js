import { realtimeDb } from "../firebase";
import { ref, get, set } from "firebase/database";
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