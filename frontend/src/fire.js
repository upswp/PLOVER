import firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyC9k8y9PN9gCOQRM9lUx071p7-zCaRD6jo",
    authDomain: "plover-e73ae.firebaseapp.com",
    databaseURL: "https://plover-e73ae-default-rtdb.firebaseio.com",
    projectId: "plover-e73ae",
    storageBucket: "plover-e73ae.appspot.com",
    messagingSenderId: "966814748963",
    appId: "1:966814748963:web:ad6fdd53ce79fda72fbc96"
};
if (!firebase.apps.length) {
    var fire = firebase.initializeApp(config);
}
export default fire;