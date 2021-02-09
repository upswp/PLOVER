//FCM 서비스 워커
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const config =  { 
    messagingSenderId: "966814748963"
}; 
const messaging = firebase.messaging();