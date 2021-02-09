import firebase from 'firebase';
// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyC9k8y9PN9gCOQRM9lUx071p7-zCaRD6jo",
  authDomain: "plover-e73ae.firebaseapp.com",
  databaseURL: "https://plover-e73ae-default-rtdb.firebaseio.com",
  projectId: "plover-e73ae",
  storageBucket: "plover-e73ae.appspot.com",
  messagingSenderId: "966814748963",
  appId: "1:966814748963:web:ad6fdd53ce79fda72fbc96"
};
  // Initialize Firebase
  firebase.initializeApp(config);

  const messaging = firebase.messaging();
  messaging.requestPermission()
    .then(function () {
      console.log('허가');
      return messaging.getToken();
    })
    .then(function (token) {
      console.log(token);
    })
    .catch(function (err) {
      console.log('fcm에러', err);
    });

    //메세지 전달받기
    messaging.onMessage(function(payload){
      console.log(payload.notification.title);
      console.log(payload.notification.body);
      console.log(payload.notification.click_action);
    })
    //토큰 다시 받기
    messaging.onTokenRefresh(function() {
      messaging.getToken()
      .then(function(refreshedToken) {
        console.log(refreshedToken);
        console.log('Token refreshed.');
      })
      .catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
    }); 