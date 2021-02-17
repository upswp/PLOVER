import fire from "./fire";

  const firebaseModule = (function () {
    async function init() {
        // Your web app's Firebase configuration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/firebase-messaging-sw.js')
                    .then(registration => {
                        // Show Notificaiton Dialog
                        const messaging = fire.messaging();
                        messaging.requestPermission()
                        .then(function() {
                            return messaging.getToken();
                        })
                          .then(async function (token) {
                       
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