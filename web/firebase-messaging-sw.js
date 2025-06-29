importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBli_JiyYxARqsPgzBgaVEabxnbmEIyCqw",
  authDomain: "ekartfood-1e632.firebaseapp.com",
  databaseURL: "https://ekartfood-1e632-default-rtdb.firebaseio.com",
  projectId: "ekartfood-1e632",
  storageBucket: "ekartfood-1e632.firebasestorage.app",
  messagingSenderId: "168461457671",
  appId: "1:168461457671:web:572c7a0ba3e444db08cda2",
  measurementId: "G-S2755GVVQ2"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});