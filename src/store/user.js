import { get, set } from 'idb-keyval';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";

export default {
    namespaced: true,
    state: {
        uid: null,
        email: null,
        username: null,
        tournaments: null,
    },
    getters: {
        uid(state) {
            return state.uid;
        },
        email(state) {
            return state.email;
        },
        username(state) {
            return state.username;
        },
        tournaments(state) {
            return state.tournaments;
        },
    },
    mutations: {
        setUid(state, uid) { state.uid = uid; },
        setEmail(state, email) { state.email = email; },
        setUsername(state, username) { state.username = username; },
        setTournaments(state, tournaments) { state.tournaments = tournaments; },
    },
    actions: {
        async registerUser(context, payload) {
            const userRef = doc(db, "users", payload.uid);
            await setDoc(userRef, {
                email: payload.email,
                uid: payload.uid,
                username: payload.username,
                tournaments: [],
            });

            context.commit('setUid', payload.uid);
            context.commit('setEmail', payload.email);
            context.commit('setUsername', payload.username);
            context.commit('setTournaments', []);
            context.dispatch('storeUser');
        },
        async updateUser(context) {
            const userRef = doc(db, "users", context.state.uid);
            await setDoc(userRef, {
                email: context.state.email,
                uid: context.state.uid,
                username: context.state.username,
                tournaments: context.state.tournaments,
            });
        },
        async loginUser(context, payload) {
            const userRef = doc(db, "users", payload.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                context.commit('setUid', userData.uid);
                context.commit('setEmail', userData.email);
                context.commit('setUsername', userData.username);
                context.commit('setTournaments', userData.tournaments);
                context.dispatch('storeUser');
            }
        },
        async logout(context) {
            await context.dispatch('clearUser');
            await context.dispatch('storeUser');
            await signOut(auth);
        },
        async addTournament(context, id) {
            context.commit('setTournaments', context.state.tournaments ? [...context.state.tournaments, id] : [id]);
            await context.dispatch('updateUser');
        },
        async fetchUser(context) {
            const userRef = doc(db, "users", context.state.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                context.commit('setUid', userData.uid);
                context.commit('setEmail', userData.email);
                context.commit('setUsername', userData.username);
                context.commit('setTournaments', userData.tournaments);
                context.dispatch('storeUser');
            }
        },
        clearUser(context) {
            context.commit('setUid', null);
            context.commit('setEmail', null);
            context.commit('setUsername', null);
            context.commit('setTournaments', null);
        },
        // IndexDB actions
        async loadUser(context) {
            const uid = await get('uid');
            const email = await get('email');
            const username = await get('username');
            const tournaments = await get('tournaments');

            if (uid)
                context.commit('setUid', uid);
            if (email)
                context.commit('setEmail', email);
            if (username)
                context.commit('setUsername', username);
            if (tournaments)
                context.commit('setTournaments', JSON.parse(tournaments));
        },
        storeUser(context) {
            set('uid', context.state.uid);
            set('email', context.state.email);
            set('username', context.state.username);
            if (context.state.tournaments) {
                set('tournaments', JSON.stringify(context.state.tournaments));
            } else {
                set('tournaments', null);
            }
        }
    },
}