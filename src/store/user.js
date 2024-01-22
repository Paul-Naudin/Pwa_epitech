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
        registerUser(context, payload) {
            context.commit('setUid', payload.uid);
            context.commit('setEmail', payload.email);
        },
        clearUser(context) {
            context.commit('setUid', null);
            context.commit('setEmail', null);
            context.commit('setUsername', null);
        },
    },
}