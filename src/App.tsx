import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
      navigator.serviceWorker.addEventListener('message', event => {
        console.log('Message reçu du service worker:', event.data);
        // Traitez le message ici
      });
    }, []);

    const handlePushSubscription = async (pushSubscription: PushSubscription) => {
      // Extrait le token du pushSubscription
      const token = pushSubscription; // ou une méthode appropriée pour obtenir le token
      // Appelle la fonction en passant le token
      sendPushTokenToServer(token);
    }

    const sendPushTokenToServer = async (token:any) => {
      const url = 'http://localhost:3002/subscribe'; // Remplacez par votre URL de serveur
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pushToken: token }),
        });

        if (!response.ok) {
          throw new Error('Failed to send push token to server');
        }

        console.log('Push token sent successfully');
      } catch (error) {
        console.error('Error sending push token to server:', error);
      }
    }

    const subscribeToNotifications = async () => {
      try {
        const sw = await navigator.serviceWorker.ready;
        const push = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          // Vous devez avoir une clé d'application serveur VAPID
          applicationServerKey: 'BOpu0wSfAR9vZypeCC9uYc6zoFnpGXBnLOfG0A43Crgnkc3EomCBanOmwAKz5PCRYLA1aqoxRMwaxAuP-xubbps'
        });

        console.log('Souscription réussie :', JSON.stringify(push));
        handlePushSubscription(push);
        setIsSubscribed(true);
        // Envoyer `push` à votre serveur si vous voulez gérer les notifications côté serveur
      } catch (error) {
        console.error('Erreur de souscription:', error);
      }
    };

  return (
    <>
      <div className="App">
        <header className="App-header">
          {/* Bouton pour afficher/cacher le menu */}
          {/*<img src={img} />*/}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? 'Cacher le Menu' : 'Afficher le Menu'}
          </button>

          {/* Le Menu */}
          {isMenuOpen && (
            <nav>
              <ul>
                <li>Liste Cachée</li>
                <li>Liste Non Cachée</li>
                <li>Notifications</li>
              </ul>
            </nav>
          )}

          {/* Bouton pour s'abonner aux notifications */}
          {!isSubscribed && (
            <button onClick={subscribeToNotifications}>
              Souscrire aux Notifications Push
            </button>
          )}
          {isSubscribed && <p>Souscrit aux notifications push</p>}
        </header>
      </div>
    </>
  )
}

export default App
