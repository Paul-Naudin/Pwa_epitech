import { get, set } from 'idb-keyval';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";

export default {
    namespaced: true,
    state: {
        uid: null,
        email: null,
        username: null,
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
    },
    mutations: {
        setUid(state, uid) { state.uid = uid; },
        setEmail(state, email) { state.email = email; },
        setUsername(state, username) { state.username = username; },
    },
    actions: {
        async registerUser(context, payload) {
            const userRef = doc(db, "users", payload.uid);
            await setDoc(userRef, {
                email: payload.email,
                uid: payload.uid,
            });

            context.commit('setUid', payload.uid);
            context.commit('setEmail', payload.email);
            context.dispatch('storeUser');
        },
        async loginUser(context, payload) {
            const userRef = doc(db, "users", payload.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                context.commit('setUid', userData.uid);
                context.commit('setEmail', userData.email);
                context.commit('setUsername', userData.username);
                context.dispatch('storeUser');
            }
        },
        async logout(context) {
            await context.dispatch('clearUser');
            await context.dispatch('storeUser');
            await signOut(auth);
        },
        clearUser(context) {
            context.commit('setUid', null);
            context.commit('setEmail', null);
            context.commit('setUsername', null);
        },
        // IndexDB actions
        async loadUser(context) {
            const uid = await get('uid');
            const email = await get('email');
            const username = await get('username');

            if (uid)
                context.commit('setUid', uid);
            if (email)
                context.commit('setEmail', email);
            if (username)
                context.commit('setUsername', username);
        },
        storeUser(context) {
            set('uid', context.state.uid);
            set('email', context.state.email);
            set('username', context.state.username);
        },
    }
}