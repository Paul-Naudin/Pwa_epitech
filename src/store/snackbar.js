export default {
    namespaced: true,
    state: {
        message: '',
        show: false,
        color: '',
    },
    getters: {
        message(state) {
            return state.message;
        },
        show(state) {
            return state.show;
        },
        color(state) {
            return state.color;
        },
    },
    mutations: {
        setMessage(state, message) { state.message = message; },
        setColor(state, color) { state.color = color; },
        setShow(state, show) { state.show = show; },
    },
    actions: {
        showSnackbar(context, payload) {
            context.commit('setMessage', payload.message);
            context.commit('setColor', payload.color);
            context.commit('setShow', true);
        },
        closeSnackbar(context) {
            context.commit('setShow', false);
        }
    },
}