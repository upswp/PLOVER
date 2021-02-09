//FCM 서비스 워커
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const config =  { 
    apiKey: "AIzaSyC9k8y9PN9gCOQRM9lUx071p7-zCaRD6jo",
    authDomain: "plover-e73ae.firebaseapp.com",
    databaseURL: "https://plover-e73ae-default-rtdb.firebaseio.com",
    projectId: "plover-e73ae",
    storageBucket: "plover-e73ae.appspot.com",
    messagingSenderId: "966814748963",
    appId: "1:966814748963:web:ad6fdd53ce79fda72fbc96"
}; 
firebase.initializeApp(config);