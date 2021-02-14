import socketIOClient from "socket.io-client";
import kurentoUtils from "kurento-utils";

class Broadcast {
    //객체생성 , 비디오설정, 채팅설정,채팅함수, 소켓이벤트생성 순으로 
    constructor() {
        console.log("new broadcast")

        //비디오 element를 저장할 변수 초기화
        this.$video = null;
        this.$video2 = null;
        //Peer객체를 저장할 변수 초기화
        this.$webRtcPeer = null;
        this.$webRtcPeer2 = null;
        //턴서버설정
        this.$iceServers = [
            {
                "urls": process.env.REACT_APP_TURN_SERVER_HOST,
                "username": process.env.REACT_APP_TURN_SERVER_USERNAME,
                "credential": process.env.REACT_APP_TURN_SERVER_CREDENTIAL
            }
        ];
    }

    createSocketClient($b_addr, $nickname) {
        //소켓 클라이언트 객체 생성
        this.$ws = socketIOClient(process.env.REACT_APP_LIVE_SERVER_HOST, {
            query: {
                "b_addr": $b_addr,
                "nickname": $nickname
            }
        });
    }

    //비디오 element를 받아 설정
    setVideo($video) {
        console.log($video);
        this.$video = $video;
    }

    setVideo2($video) {
        this.$video2 = $video;
    }

    setChat($chat) {
        this.$chat = $chat;
    }

    setViewNum(viewNum) {
        this.setViewNum = viewNum;
    }

    setAddChat(addChat) {
        this.addChat = addChat;
    }

    mainScreen($mainScreen) {
        this.$mainScreen = $mainScreen;
    }

    setMainScreen($setMainScreen) {
        this.setMainScreen = $setMainScreen;
    }

    //소켓클라이언트에 이벤트리스너 달기
    createSocketEvent() {

        this.$ws.on('message', function (msg) {
            //JSON 문자열 파싱
            let parseMsg = JSON.parse(msg);
            console.info('Received message: ' + msg);

            switch (parseMsg.id) {
                case 'openliveResponse':
                    this.liveResponse(parseMsg);
                    break;
                case 'shareScreenResponse':
                    this.shareScreenResponse(parseMsg);
                    break;
                case 'watchliveResponse':
                    this.viewResponse(parseMsg);
                    break;
                case 'watchScreenResponse':
                    this.watchScreenResponse(parseMsg);
                    break;
                case 'stopCommunication':
                    this.dispose();
                    break;
                case 'iceCandidate':
                    this.$webRtcPeer.addIceCandidate(parseMsg.candidate)
                    break;
                case 'iceCandidate2':
                    this.$webRtcPeer2.addIceCandidate(parseMsg.candidate)
                    break;
                default:
                    console.error('Unrecognized message', parseMsg);
            }
        }.bind(this));

        //채팅관련 이벤트
        this.$ws.on('chat', function (msg) {
            let parseMsg = msg;
            if (parseMsg.nickname) { //일반채팅
                console.log(parseMsg);
                this.addChat([...this.$chat, {
                    type: "chat",
                    nickname: parseMsg.nickname,
                    message: parseMsg.message
                }]);
            } else { //방에 입장
                this.addChat([...this.$chat, {
                    type: "join",
                    message: parseMsg
                }]);
            }
        }.bind(this));

        this.$ws.on('viewnum', function (msg) {
            console.log(msg);
            this.setViewNum(msg);
        }.bind(this));
    }

    //peer객체 소멸시키기
    dispose() {
        if (this.$webRtcPeer) {
            this.$webRtcPeer.dispose();
            this.$webRtcPeer = null;
        }
    }

    //라이브 시작한 사람이 sdpOffer를 보낸이후
    //App server로 부터
    //sdpAnswer를 전달받는다.
    liveResponse(message) {
        if (message.response != 'accepted') {
            let errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
            this.dispose();
        } else {
            this.$webRtcPeer.processAnswer(message.sdpAnswer);
        }
    }

    shareScreenResponse(message) {
        if (message.response != 'accepted') {
            let errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
            this.dispose();
        } else {
            this.$webRtcPeer2.processAnswer(message.sdpAnswer);
        }
    }

    //라이브 청취하는 사람이 sdpOffer를 보낸이후
    //App server로 부터
    //sdpAnswer를 전달받는다.
    viewResponse(message) {
        if (message.response != 'accepted') {
            let errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
            this.dispose();
        } else {
            this.$webRtcPeer.processAnswer(message.sdpAnswer);
        }
    }

    watchScreenResponse(message) {
        if (message.response != 'accepted') {
            let errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
            this.dispose();
        } else {
            console.log("watchScreenResponse accecpt");
            this.$webRtcPeer2.processAnswer(message.sdpAnswer);
        }
    }

    setFullScreen() {
        if (this.$mainScreen === "video1") {
            if (this.$video.requestFullscreen) {
                this.$video.requestFullscreen();
            } else if (this.$video.mozRequestFullScreen) {
                this.$video.mozRequestFullScreen();
            } else if (this.$video.webkitRequestFullscreen) {
                this.$video.webkitRequestFullscreen();
            }
        } else {
            if (this.$video2.requestFullscreen) {
                this.$video2.requestFullscreen();
            } else if (this.$video2.mozRequestFullScreen) {
                this.$video2.mozRequestFullScreen();
            } else if (this.$video2.webkitRequestFullscreen) {
                this.$video2.webkitRequestFullscreen();
            }
        }
    }

    //방송시작을 누르면 실행되는 메서드
    async live() {
        //Peer객체가 없다면
        if (!this.$webRtcPeer) {

            await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                .then(function (stream) {
                    this.$video.srcObject = stream;
                    this.$stream = stream;
                }.bind(this), function (err) {
                    console.log(err);
                });

            let options = {
                //localVideo: this.$video,
                videoStream: this.$stream,
                onicecandidate: this.onIceCandidate.bind(this),
                configuration: {
                    iceServers: this.$iceServers
                }
            }

            let self = this;
            //발표자의 경우 송신용 Peer를 생성한다.
            this.$webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error) {
                    console.log(error);
                    self.stop();
                    return;
                }

                //sdpOffer를 생성하여 App서버로 전송
                this.generateOffer(self.onOfferLiver.bind(self));
            });
        }
    }

    shareScreen() {
        if (!this.$webRtcPeer2) {

            let self = this;

            navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
                .then(function (stream) {
                    this.$video2.srcObject = stream;
                    this.$stream2 = stream;

                    stream.getVideoTracks()[0].addEventListener('ended', () => {
                        console.log('영상공유 끊킴');
                    });

                    let options = {
                        //localVideo: this.$video2,
                        videoStream: this.$stream2,
                        onicecandidate: this.onIceCandidate2.bind(this),
                        configuration: {
                            iceServers: this.$iceServers
                        }
                    }

                    //발표자의 경우 송신용 Peer를 생성한다.
                    this.$webRtcPeer2 = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                        if (error) {
                            console.log(error);
                            self.stop();
                            return;
                        }

                        //sdpOffer를 생성하여 App서버로 전송
                        this.generateOffer(self.onOfferScreen.bind(self));
                    });

                }.bind(this), function (err) {
                    console.log(err);
                });
        }
    }

    //sdpOffer를 받아 App서버로 전송하는 메서드
    onOfferLiver(error, offerSdp) {
        if (error) {
            console.log(error);
            this.stop();
            return;
        }

        let message = {
            id: 'openLive',
            sdpOffer: offerSdp
        };
        this.sendMessage(message);
        this.shareScreen();
    }

    onOfferScreen(error, offerSdp) {
        if (error) {
            console.log(error);
            this.stop();
            return;
        }

        let message = {
            id: 'shareScreen',
            sdpOffer: offerSdp
        };
        this.sendMessage(message);
    }

    //방송청취자가 방송시청클릭시 실행되는 메서드
    viewer() {
        //Peer객체가 없다면
        if (!this.$webRtcPeer) {

            let options = {
                remoteVideo: this.$video,
                onicecandidate: this.onIceCandidate.bind(this),
                configuration: {
                    iceServers: this.$iceServers
                }
            }

            let self = this;
            //수신용 Peer를 생성한다.
            this.$webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    console.log(error);
                    self.stop();
                    return;
                }

                //sdpOffer를 생성하여 App서버로 전송
                this.generateOffer(self.onOfferViewer.bind(self));
            });
        }
    }

    viewScreen() {
        //Peer객체가 없다면
        if (!this.$webRtcPeer2) {

            let options = {
                remoteVideo: this.$video2,
                onicecandidate: this.onIceCandidate2.bind(this),
                configuration: {
                    iceServers: this.$iceServers
                }
            }

            let self = this;
            //수신용 Peer를 생성한다.
            this.$webRtcPeer2 = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    console.log(error);
                    self.stop();
                    return;
                }

                //sdpOffer를 생성하여 App서버로 전송
                this.generateOffer(self.onOfferViewScreen.bind(self));
            });
        }
    }

    //sdpOffer를 받아 App서버로 전송하는 메서드
    onOfferViewer(error, offerSdp) {
        if (error) {
            console.log(error);
            this.stop();
            return;
        }

        let message = {
            id: 'watchLive',
            sdpOffer: offerSdp
        }
        this.sendMessage(message);
        this.viewScreen();
    }

    onOfferViewScreen(error, offerSdp) {
        if (error) {
            console.log(error);
            this.stop();
            return;
        }

        let message = {
            id: 'watchScreen',
            sdpOffer: offerSdp
        }
        this.sendMessage(message);
    }

    //라이브 및 방송 청취를 중단하는 메서드
    //그리고 Peer객체 소멸시킴
    stop() {
        if (this.$webRtcPeer) {
            let message = {
                id: 'stop'
            }
            this.sendMessage(message);
            this.dispose();
        }
    }

    //클라이언트의 네트워크 정보를 보내는 메서드
    onIceCandidate(candidate) {
        console.log('Local candidate' + JSON.stringify(candidate));

        let message = {
            id: 'onIceCandidate',
            candidate: candidate
        }
        this.sendMessage(message);
    }

    onIceCandidate2(candidate) {
        console.log('Local candidate' + JSON.stringify(candidate));

        let message = {
            id: 'onIceCandidate2',
            candidate: candidate
        }
        this.sendMessage(message);
    }

    //App서버로 메시지를 범용적으로 보내기위한 메서드
    sendMessage(message) {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        this.$ws.emit('message', jsonMessage);
    }

    //서버로 채팅 날리기
    sendChat(message) {
        console.log(message);
        this.$ws.emit('chat', message);
    }
}

export default Broadcast;