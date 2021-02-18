//const fs = require('fs');
const path = require('path');
const kurento = require('kurento-client');
const express = require('express');
const cors = require('cors');

/*
var options =
{
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt')
};
*/

let app = express();
app.use(cors());
let server = require('http').createServer(app);
let io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

//server port
let port = 8080;
const media_server_uri = "ws://coturn.plover.co.kr:8888/kurento";

let Id = 0;

let kurentoClient = null;
let candidatesQueue = {};
let lives = [];//방마다 클라이언트 관리
let clientId = 0;

io.sockets.on('connection', client => {
    let nickname = client.handshake.query.nickname;
    let b_addr = client.handshake.query.b_addr;
    let clientInfo = null;
    if (!nickname || !b_addr) {
        console.log("Parameter[nickname,b_addr] is not defined");
        client.emit('error', "Parameter[nickname,b_addr] is not defined");
    }
    else {
        clientInfo = {
            clientId: generateId(),
            nickname,
            b_addr
        };
        console.log(`${clientInfo.nickname}님이 ${clientInfo.b_addr}로 입장하셨습니다.`);
    }

    client.on('message', (_message) => {
        let message = JSON.parse(_message);

        switch (message.id) {
            case 'openLive':
                //방생성
                createRoom(client, clientInfo);
                //방송시작
                openLive(clientInfo, client, message.sdpOffer);
                break;
            case 'shareScreen':
                shareScreen(clientInfo, client, message.sdpOffer);
                break;
            case 'watchLive':
                //방참가
                joinRoom(client, clientInfo);
                //방송보기
                watchLive(clientInfo, client, message.sdpOffer);
                break;
            case 'watchScreen':
                watchScreen(clientInfo, client, message.sdpOffer);
                break;
            case 'stop':
                //그만방송 또는 보기
                stop(clientInfo);
                break;
            case 'onIceCandidate':
                onIceCandidate(clientInfo, message.candidate);
                break;
            case 'onIceCandidate2':
                onIceCandidate2(clientInfo, message.candidate);
                break;
            default:
                //잘못보낸 요청
                client.emit('message', JSON.stringify({
                    id: 'error',
                    message: 'Invalid message ' + message
                }));
                break;
        }

        //io.sockets.emit('message', message);
    });

    client.on('chat', (message) => {
        io.sockets.in(clientInfo.b_addr).emit('chat', {
            nickname: clientInfo.nickname,
            message
        });

    });

    client.on('error', (error) => {
        console.log(`Error : ${error}`);
    });

    client.on('disconnect', () => {
        io.sockets.in(clientInfo.b_addr).emit('chat', `${clientInfo.nickname}님이 방에서 나가셨습니다. `);
        stop(clientInfo);
        console.log(`${clientId} is disconnected`);
        if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].viewers && Object.keys(lives[clientInfo.b_addr].viewers).length > 0) io.sockets.in(clientInfo.b_addr).emit('viewnum', `${Object.keys(lives[clientInfo.b_addr].viewers).length}`);
        else io.sockets.in(clientInfo.b_addr).emit('viewnum', `0`);
    });

});

let generateId = () => {
    Id++;
    return Id.toString();
}

let createRoom = (client, clientInfo) => {
    //let rooms = io.sockets.manager.rooms
    client.join(clientInfo.b_addr);//방에 조인
    lives[clientInfo.b_addr] = {
        anchor: {
            status: false,//방송상태
            nickname: clientInfo.nickname,
            clientId: clientInfo.clientId,
            pipeline: null, //카메라파이프라인
            pipeline2: null, //화면공유파이프라인
            webRtcEndpoint: null, //카메라 엔드포인트
            webRtcEndpoint2: null //화면공유 엔트포인트
        },//BJ
        viewers: {}//시청자
    }
}

let joinRoom = (client, clientInfo) => {
    client.join(clientInfo.b_addr);//방에 조인
    if(!lives[clientInfo.b_addr]){
        stop(clientInfo);
	return;
    }
    lives[clientInfo.b_addr].viewers[clientInfo.clientId] = {
        nickname: clientInfo.nickname,
        clientId: clientInfo.clientId,
        webRtcEndpoint: null, //카메라수신용
        webRtcEndpoint2: null, //화면공유수신용
        client: null
    }
    if (lives[clientInfo.b_addr]) io.sockets.in(clientInfo.b_addr).emit('viewnum', `${Object.keys(lives[clientInfo.b_addr].viewers).length}`);
    //console.log(JSON.stringify(lives[clientInfo.b_addr].viewers));
    io.sockets.in(clientInfo.b_addr).emit('chat', `${clientInfo.nickname}님이 방에 입장하셨습니다.`);
}


let openLive = (clientInfo, client, sdpOffer) => {
    clearCandidatesQueue(clientInfo.clientId);

    let handler = (error, sdpAnswer) => {

        if (error) {
            console.log(error);
            return client.emit('message', JSON.stringify({
                id: 'openliveResponse',
                response: 'rejected',
                message: error
            }));
        }

        client.emit('message', JSON.stringify({
            id: 'openliveResponse',
            response: 'accepted',
            sdpAnswer: sdpAnswer
        }));
    }

    //누군가 방송중인경우
    if (lives[clientInfo.b_addr].anchor.status) {
        return handler("Another user is currently broadcasting live");
    }

    return new Promise((resolve, reject) => {
        if (kurentoClient !== null) {
            resolve(kurentoClient);
        }

        //미디어 서버와 통신하는 kurentoClient 객체생성
        kurento(media_server_uri, (error, _kurentoClient) => {
            if (error) {
                console.log(`Could not found media server ${media_server_uri}`);
                reject(error);
            }

            kurentoClient = _kurentoClient;
            resolve(kurentoClient);
        });

    })
        .then((kurentoClient) => {

            return new Promise((resolve, reject) => {
                //미디어 서버와 연결되는 파이프라인 생성
                kurentoClient.create('MediaPipeline', (error, pipeline) => {
                    if (error) {
                        reject(error);
                    }

                    lives[clientInfo.b_addr].anchor.pipeline = pipeline;
                    //console.log(pipeline);
                    resolve(pipeline);
                });
            });
        })
        .then((pipeline) => {
            console.log(pipeline);
            //WebRtcEndpoint 생성 :미디어서버로 WEBRTC흐름을 보내고 받기위한 요소
            pipeline.create('WebRtcEndpoint', (error, webRtcEndpoint) => {
                if (error) {
                    throw new Error(error);
                }

                lives[clientInfo.b_addr].anchor.webRtcEndpoint = webRtcEndpoint;

                if (candidatesQueue[clientInfo.clientId]) {
                    while (candidatesQueue[clientInfo.clientId].length) {
                        let candidate = candidatesQueue[clientInfo.clientId].shift();
                        webRtcEndpoint.addIceCandidate(candidate);
                    }
                }

                webRtcEndpoint.on('OnIceCandidate', function (event) {
                    let candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                    client.emit('message', JSON.stringify({
                        id: 'iceCandidate',
                        candidate: candidate
                    }));
                });

                webRtcEndpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
                    if (error) {
                        throw new Error(error);
                    }

                    handler(null, sdpAnswer);
                });

                webRtcEndpoint.gatherCandidates(function (error) {
                    if (error) {
                        throw new Error(error);
                    }
                });

                //방송상태 온
                //lives[clientInfo.b_addr].anchor.status = true;
            });
        })
        .catch((err) => {
            handler(err);
        })
}

let shareScreen = (clientInfo, client, sdpOffer) => {
    clearCandidatesQueue(clientInfo.clientId);

    let handler = (error, sdpAnswer) => {

        if (error) {
            console.log(error);
            return client.emit('message', JSON.stringify({
                id: 'shareScreenResponse',
                response: 'rejected',
                message: error
            }));
        }

        client.emit('message', JSON.stringify({
            id: 'shareScreenResponse',
            response: 'accepted',
            sdpAnswer: sdpAnswer
        }));
    }

    //누군가 방송중인경우
    if (lives[clientInfo.b_addr].anchor.status) {
        return handler("Another user is currently broadcasting live");
    }

    return new Promise((resolve, reject) => {
        if (kurentoClient !== null) {
            resolve(kurentoClient);
        }

        //미디어 서버와 통신하는 kurentoClient 객체생성
        kurento(media_server_uri, (error, _kurentoClient) => {
            if (error) {
                console.log(`Could not found media server ${media_server_uri}`);
                reject(error);
            }

            kurentoClient = _kurentoClient;
            resolve(kurentoClient);
        });

    })
        .then((kurentoClient) => {

            return new Promise((resolve, reject) => {
                //미디어 서버와 연결되는 파이프라인 생성
                kurentoClient.create('MediaPipeline', (error, pipeline) => {
                    if (error) {
                        reject(error);
                    }

                    lives[clientInfo.b_addr].anchor.pipeline2 = pipeline;
                    //console.log(pipeline);
                    resolve(pipeline);
                });
            });
        })
        .then((pipeline) => {
            console.log(pipeline);
            //WebRtcEndpoint 생성 :미디어서버로 WEBRTC흐름을 보내고 받기위한 요소
            pipeline.create('WebRtcEndpoint', (error, webRtcEndpoint) => {
                if (error) {
                    throw new Error(error);
                }

                lives[clientInfo.b_addr].anchor.webRtcEndpoint2 = webRtcEndpoint;

                if (candidatesQueue[clientInfo.clientId]) {
                    while (candidatesQueue[clientInfo.clientId].length) {
                        let candidate = candidatesQueue[clientInfo.clientId].shift();
                        webRtcEndpoint.addIceCandidate(candidate);
                    }
                }

                webRtcEndpoint.on('OnIceCandidate', function (event) {
                    let candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                    client.emit('message', JSON.stringify({
                        id: 'iceCandidate2',
                        candidate: candidate
                    }));
                });

                webRtcEndpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
                    if (error) {
                        throw new Error(error);
                    }

                    handler(null, sdpAnswer);
                });

                webRtcEndpoint.gatherCandidates(function (error) {
                    if (error) {
                        throw new Error(error);
                    }
                });

                //방송상태 온
                lives[clientInfo.b_addr].anchor.status = true;
            });
        })
        .catch((err) => {
            handler(err);
        })
}

let watchLive = (clientInfo, client, sdpOffer) => {
    clearCandidatesQueue(clientInfo.clientId);

    let handler = (error, sdpAnswer) => {

        if (error) {
            console.log(error);
            return client.emit('message', JSON.stringify({
                id: 'watchliveResponse',
                response: 'rejected',
                message: error
            }));
        }

        client.emit('message', JSON.stringify({
            id: 'watchliveResponse',
            response: 'accepted',
            sdpAnswer: sdpAnswer
        }));
    }

    //방송자가 없거나 방송중이 아닌경우
    if (!lives[clientInfo.b_addr] || !lives[clientInfo.b_addr].anchor || !lives[clientInfo.b_addr].anchor.status) {
        return handler("live is not found");
    }

    return new Promise((resolve, reject) => {
        lives[clientInfo.b_addr].anchor.pipeline.create('WebRtcEndpoint', (error, webRtcEndpoint) => {
            if (error) {
                reject(error);
            }

            lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint = webRtcEndpoint;
            lives[clientInfo.b_addr].viewers[clientInfo.clientId].client = client;

            if (candidatesQueue[clientInfo.clientId]) {
                while (candidatesQueue[clientInfo.clientId].length) {
                    let candidate = candidatesQueue[clientInfo.clientId].shift();
                    webRtcEndpoint.addIceCandidate(candidate);
                }
            }

            webRtcEndpoint.on('OnIceCandidate', function (event) {
                let candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                client.emit('message', JSON.stringify({
                    id: 'iceCandidate',
                    candidate: candidate
                }));
            });

            webRtcEndpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
                if (error) {
                    reject(error);
                }

                lives[clientInfo.b_addr].anchor.webRtcEndpoint.connect(webRtcEndpoint, function (error) {
                    if (error) {
                        reject(error);
                    }

                    handler(null, sdpAnswer);

                    webRtcEndpoint.gatherCandidates(function (error) {
                        if (error) {
                            return handler(error);
                        }
                    });
                });
            });

        });

    })
        .catch((err) => {
            handler(err);
        })
}

let watchScreen = (clientInfo, client, sdpOffer) => {
    clearCandidatesQueue(clientInfo.clientId);

    let handler = (error, sdpAnswer) => {

        if (error) {
            console.log(error);
            return client.emit('message', JSON.stringify({
                id: 'watchScreenResponse',
                response: 'rejected',
                message: error
            }));
        }

        client.emit('message', JSON.stringify({
            id: 'watchScreenResponse',
            response: 'accepted',
            sdpAnswer: sdpAnswer
        }));
    }

    //방송자가 없거나 방송중이 아닌경우
    if (!lives[clientInfo.b_addr] || !lives[clientInfo.b_addr].anchor || !lives[clientInfo.b_addr].anchor.status) {
        return handler("live is not found");
    }

    return new Promise((resolve, reject) => {
        lives[clientInfo.b_addr].anchor.pipeline2.create('WebRtcEndpoint', (error, webRtcEndpoint) => {
            if (error) {
                reject(error);
            }

            lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint2 = webRtcEndpoint;
            lives[clientInfo.b_addr].viewers[clientInfo.clientId].client = client;

            if (candidatesQueue[clientInfo.clientId]) {
                while (candidatesQueue[clientInfo.clientId].length) {
                    let candidate = candidatesQueue[clientInfo.clientId].shift();
                    webRtcEndpoint.addIceCandidate(candidate);
                }
            }

            webRtcEndpoint.on('OnIceCandidate', function (event) {
                let candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                client.emit('message', JSON.stringify({
                    id: 'iceCandidate2',
                    candidate: candidate
                }));
            });

            webRtcEndpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
                if (error) {
                    reject(error);
                }

                lives[clientInfo.b_addr].anchor.webRtcEndpoint2.connect(webRtcEndpoint, function (error) {
                    if (error) {
                        reject(error);
                    }

                    handler(null, sdpAnswer);

                    webRtcEndpoint.gatherCandidates(function (error) {
                        if (error) {
                            return handler(error);
                        }
                    });
                });
            });

        });

    })
        .catch((err) => {
            handler(err);
        })
}

let clearCandidatesQueue = (clientId) => {
    if (candidatesQueue[clientId]) {
        delete candidatesQueue[clientId];
    }
}

let onIceCandidate = (clientInfo, _candidate) => {
    let candidate = kurento.getComplexType('IceCandidate')(_candidate);

    if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].anchor && lives[clientInfo.b_addr].anchor.clientId === clientInfo.clientId
        && lives[clientInfo.b_addr].anchor.webRtcEndpoint) {
        //console.info('Sending BJ candidate');
        lives[clientInfo.b_addr].anchor.webRtcEndpoint.addIceCandidate(candidate);
    }

    else if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].viewers[clientInfo.clientId] && lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint) {
        //console.info('Sending viewer candidate');
        lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint.addIceCandidate(candidate);
    }
    else {
        //console.info('Queueing candidate');
        if (!candidatesQueue[clientInfo.clientId]) {
            candidatesQueue[clientInfo.clientId] = [];
        }
        candidatesQueue[clientInfo.clientId].push(candidate);
    }
}

let onIceCandidate2 = (clientInfo, _candidate) => {
    let candidate = kurento.getComplexType('IceCandidate')(_candidate);

    if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].anchor && lives[clientInfo.b_addr].anchor.clientId === clientInfo.clientId
        && lives[clientInfo.b_addr].anchor.webRtcEndpoint2) {
        //console.info('Sending BJ candidate');
        lives[clientInfo.b_addr].anchor.webRtcEndpoint2.addIceCandidate(candidate);
    }

    else if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].viewers[clientInfo.clientId] && lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint2) {
        //console.info('Sending viewer candidate');
        lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint2.addIceCandidate(candidate);
    }
    else {
        //console.info('Queueing candidate');
        if (!candidatesQueue[clientInfo.clientId]) {
            candidatesQueue[clientInfo.clientId] = [];
        }
        candidatesQueue[clientInfo.clientId].push(candidate);
    }
}


let stop = (clientInfo) => {
    console.log(JSON.stringify(clientInfo));
    if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].anchor
        && lives[clientInfo.b_addr].anchor.clientId !== null && lives[clientInfo.b_addr].anchor.clientId === clientInfo.clientId) {
        for (let key in lives[clientInfo.b_addr].viewers) {
            let viewer = lives[clientInfo.b_addr].viewers[key];
            if (viewer.client) {
                viewer.client.emit('message', JSON.stringify({
                    id: 'stopCommunication'
                }));
            }
        }
        if(lives[clientInfo.b_addr].anchor.pipeline) lives[clientInfo.b_addr].anchor.pipeline.release();
        if(lives[clientInfo.b_addr].anchor.pipeline2) lives[clientInfo.b_addr].anchor.pipeline2.release();

        lives[clientInfo.b_addr].anchor = null;
        lives[clientInfo.b_addr].viewers.length = 0;
    } else if (lives[clientInfo.b_addr] && lives[clientInfo.b_addr].viewers[clientInfo.clientId]) {

        if(lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint) lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint.release();
        if(lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint2) lives[clientInfo.b_addr].viewers[clientInfo.clientId].webRtcEndpoint2.release();

        delete lives[clientInfo.b_addr].viewers[clientInfo.clientId];
    }

    clearCandidatesQueue(clientInfo.clientId);
}

app.use(express.static(path.join(__dirname, 'static')));

server.listen(port, function () {
    console.log(`server start listening on port ${port}`);
});
