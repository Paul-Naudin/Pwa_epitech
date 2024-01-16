export default {
    state: {
        user: null,
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        setUser(context, user) {
            context.commit('setUser', user);
        },
        deleteUser(context) {
            context.commit('setUser', null);
        }
    },
}