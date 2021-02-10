import socketIOClient from "socket.io-client";
import kurentoUtils from "kurento-utils";

class Broadcast {
    //객체생성 , 비디오설정, 채팅설정, 소켓이벤트생성 순으로 
    constructor($b_addr, $nickname) {
        //소켓 클라이언트 객체 생성
        this.$ws = socketIOClient(process.env.LIVE_SERVER_HOST, {
            query: {
                "b_addr": $b_addr,
                "nickname": $nickname
            }
        });
        //비디오 element를 저장할 변수 초기화
        this.$video = null;
        //Peer객체를 저장할 변수 초기화
        this.$webRtcPeer = null;
        //턴서버설정
        this.$iceServers = [
            {
                "urls": process.env.TURN_SERVER_HOST,
                "username": process.env.TURN_SERVER_USERNAME,
                "credential": process.env.TURN_SERVER_CREDENTIAL
            }
        ];
    }

    //비디오 element를 받아 설정
    setVideo($video) {
        this.$video = $video;
    }

    setChat($chat) {
        this.$chat = $chat;
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
                case 'watchliveResponse':
                    this.viewResponse(parseMsg);
                    break;
                case 'stopCommunication':
                    this.dispose();
                    break;
                case 'iceCandidate':
                    this.$webRtcPeer.addIceCandidate(parseMsg.candidate)
                    break;
                default:
                    console.error('Unrecognized message', parseMsg);
            }
        });

        //채팅관련 이벤트
        this.$ws.on('chat', function (msg) {
            let parseMsg = JSON.parse(msg);
            if (parseMsg.nickname) { //일반채팅
                this.addChat(...this.$state.chat, {
                    type: "chat",
                    nickname: parseMsg.nickname,
                    message: parseMsg.nickname
                });
            } else { //방에 입장
                this.addChat(...this.$state.chat, {
                    type: "join",
                    message: parseMsg
                });
            }
        });
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

    //방송시작을 누르면 실행되는 메서드
    live() {
        //Peer객체가 없다면
        if (!this.$webRtcPeer) {

            let options = {
                localVideo: this.$video,
                onicecandidate: this.onIceCandidate,
                configuration: {
                    iceServers: this.$iceServers
                }
            }

            //발표자의 경우 송신용 Peer를 생성한다.
            this.$webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
                if (error) return onError(error);

                //sdpOffer를 생성하여 App서버로 전송
                this.generateOffer(this.onOfferLiver);
            });
        }
    }

    //sdpOffer를 받아 App서버로 전송하는 메서드
    onOfferLiver(error, offerSdp) {
        if (error) return onError(error);

        let message = {
            id: 'openLive',
            sdpOffer: offerSdp
        };
        this.sendMessage(message);
    }

    //방송청취자가 페이지에 들어오면 실행되는 메서드
    viewer() {
        //Peer객체가 없다면
        if (!this.$webRtcPeer) {

            let options = {
                remoteVideo: this.$video,
                onicecandidate: this.onIceCandidate,
                configuration: {
                    iceServers: this.$iceServers
                }
            }

            //수신용 Peer를 생성한다.
            this.$webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) return onError(error);

                //sdpOffer를 생성하여 App서버로 전송
                this.generateOffer(this.onOfferViewer);
            });
        }
    }

    //sdpOffer를 받아 App서버로 전송하는 메서드
    onOfferViewer(error, offerSdp) {
        if (error) return onError(error)

        let message = {
            id: 'watchLive',
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

    //App서버로 메시지를 범용적으로 보내기위한 메서드
    sendMessage(message) {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        this.$ws.emit('message', jsonMessage);
    }

    //서버로 채팅 날리기
    sendChat(message) {
        this.$ws.emit('chat', message);
    }
}

export default Broadcast;