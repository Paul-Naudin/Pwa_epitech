import { createStore } from 'vuex';
import user from './user';
import snackbar from './snackbar';
import tournaments from './tournaments';

export default createStore({
  modules: {
    user,
    snackbar,
    tournaments,
  },
});