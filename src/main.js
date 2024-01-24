import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getAnalytics } from "firebase/analytics";
import { app } from './firebase';
import vuetify from './plugins/vuetify';
import store from './store';


const vueApp = createApp(App)

vueApp.use(router)
vueApp.use(vuetify)
vueApp.use(store)

vueApp.mount('#app')

store.dispatch('user/loadUser');

const analytics = getAnalytics(app)