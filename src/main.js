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

Notification.requestPermission().then(function (permission) {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
    } else {
        console.log('Unable to get permission to notify.');
    }
});

navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager.subscribe({ userVisibleOnly: true }).then(function (subscription) {
        console.log('Subscribed for push notifications.', subscription);
    });
});