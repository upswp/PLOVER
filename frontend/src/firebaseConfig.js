import firebase from 'firebase';
import axios from 'axios'

// Your web app's Firebase configuration
// var config = {
//   apiKey: "AIzaSyC9k8y9PN9gCOQRM9lUx071p7-zCaRD6jo",
//   authDomain: "plover-e73ae.firebaseapp.com",
//   databaseURL: "https://plover-e73ae-default-rtdb.firebaseio.com",
//   projectId: "plover-e73ae",
//   storageBucket: "plover-e73ae.appspot.com",
//   messagingSenderId: "966814748963",
//   appId: "1:966814748963:web:ad6fdd53ce79fda72fbc96"
// };
//   // Initialize Firebase
//   firebase.initializeApp(config);

  const firebaseModule = (function () {
    async function init() {
        // Your web app's Firebase configuration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/firebase-messaging-sw.js')
                    .then(registration => {
                        var firebaseConfig = {
                          apiKey: "AIzaSyC9k8y9PN9gCOQRM9lUx071p7-zCaRD6jo",
                          authDomain: "plover-e73ae.firebaseapp.com",
                          databaseURL: "https://plover-e73ae-default-rtdb.firebaseio.com",
                          projectId: "plover-e73ae",
                          storageBucket: "plover-e73ae.appspot.com",
                          messagingSenderId: "966814748963",
                          appId: "1:966814748963:web:ad6fdd53ce79fda72fbc96"
                        };
                        // Initialize Firebase
                        firebase.initializeApp(firebaseConfig);


                        // Show Notificaiton Dialog
                        const messaging = firebase.messaging();
                        messaging.requestPermission()
                        .then(function() {
                            return messaging.getToken();
                        })
                          .then(async function (token) {
                          //여기에 이제 토큰을 전달할 axios 넣어야함
                            // await axios.post('https://dev.plover.co.kr/ssafy/getFCMToken', {fcmToken: token })
                            console.log(token);
                            messaging.onMessage(payload => {
                                const title = payload.notification.title
                                const options = {
                                    body : payload.notification.body
                                }
                                navigator.serviceWorker.ready.then(registration => {
                                    registration.showNotification(title, options);
                                })
                            })
                        })
                        .catch(function(err) {
                            console.log("Error Occured");
                        })
                    })
            })
        }
    }      

    return {
        init: function () {
            init()
        }
    }
})()

firebaseModule.init()


  // const messaging = firebase.messaging();
  // messaging.requestPermission()
  //   .then(function () {
  //     console.log('허가');
  //     return messaging.getToken();
  //   })
  //   .then(function (token) {
  //     console.log(token);
  //   })
  //   .catch(function (err) {
  //     console.log('fcm에러', err);
  //   });

  //   //메세지 전달받기
  //   messaging.onMessage(function(payload){
  //     console.log(payload.notification.title);
  //     console.log(payload.notification.body);
  //     console.log(payload.notification.click_action);
  //   })
  //   //토큰 다시 받기
  //   messaging.onTokenRefresh(function() {
  //     messaging.getToken()
  //     .then(function(refreshedToken) {
  //       console.log(refreshedToken);
  //       console.log('Token refreshed.');
  //     })
  //     .catch(function(err) {
  //       console.log('Unable to retrieve refreshed token ', err);
  //     });
  //   }); 