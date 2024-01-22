import { createStore } from 'vuex';
import user from './user';
import snackbar from './snackbar';

export default createStore({
  modules: {
    user,
    snackbar,
  },
});