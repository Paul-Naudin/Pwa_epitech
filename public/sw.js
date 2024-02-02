import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';

// Utilisez avec l'injection de précaching
precacheAndRoute(self.__WB_MANIFEST);

// Installez et activez le service worker
skipWaiting();
clientsClaim();

// Pré-mise en cache des actifs spécifiques
precacheAndRoute([
  // Ajoutez les chemins des fichiers que vous voulez mettre en cache ici
  '/index.html',
  '/src/App.vue',
  '/src/main.js',
  // etc.
]);

// Gestion de la stratégie de mise en cache pour les pages
registerRoute(
  // Assurez-vous de modifier cette expression régulière pour qu'elle corresponde à vos besoins
  /\/api\/.*/,
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      // Ajoutez des plugins si nécessaire (expiration, etc.)
    ],
  })
);

// Gestion de la stratégie de mise en cache pour d'autres ressources statiques
registerRoute(
  // Définissez une expression régulière pour les ressources statiques (images, CSS, etc.)
  /\.(png|jpg|css|js|vue)$/,
  // Utilisez une stratégie CacheFirst pour les ressources statiques
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      // Ajoutez des plugins si nécessaire (expiration, etc.)
    ],
  })
);

// Gestion de l'événement fetch
self.addEventListener('fetch', event => {
  // Vous pouvez ajouter des logiques spécifiques pour la gestion des requêtes ici
});

// Gestion de l'événement push
self.addEventListener('push', function(event) {
  const title = 'New Notification';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Gestion de l'événement de changement de contrôleur
navigator.serviceWorker.addEventListener('controllerchange', () => {
  // Le service worker a changé, rechargez les données
  window.location.reload();
});

// Vous pouvez ajouter d'autres fonctionnalités nécessaires pour respecter les consignes
