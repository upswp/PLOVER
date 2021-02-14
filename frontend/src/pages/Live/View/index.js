import React, { useLayoutEffect, useEffect, useState } from 'react';
import styles from './index.module.css';
import { Navbar, PulseBadge, Skeleton, Input, ButtonComp } from "src/components";
import Broadcast from "src/lib/broadcast";
import queryString from "query-string";

let broadcast = new Broadcast();

function View(props) {

    const [chat, addChat] = useState([]);
    const [viewNum, setViewNum] = useState(0);
    const query = queryString.parse(props.location.search);

    useLayoutEffect(() => {
        console.log("useEffect");
        broadcast.createSocketClient(query.b_addr, query.nickname);
        broadcast.setVideo(document.getElementById("live_screen"));
        broadcast.setChat(chat);
        broadcast.setAddChat(addChat);
        broadcast.setViewNum(setViewNum);
        broadcast.createSocketEvent();
        //broadcast.viewer();

        return () => {
            broadcast.stop();
        };
    }, []);

    useEffect(() => {
        console.log(chat);
        broadcast.setChat(chat);
    }, [chat]);

    return (
        <div id="live_view" className={styles.live_view}>
            <Navbar color="white">
                <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
                <span className={"color_black" + " " + styles.title}>라이브방송 보기</span>
                <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
            </Navbar>
            <div className={styles.live_box}>
                <video id="live_screen" loop className={styles.live_screen} autoPlay />
                <div className={styles.badge_box}>
                    <PulseBadge className={styles.badge} title="준비중" bg="black" />
                </div>
                <div className={styles.viewrate_box}>
                    <i className={"fas fa-user-alt " + styles.viewicon}></i>
                    <span className={styles.viewtext}>{`${viewNum}명`}</span>
                </div>
                <div className={styles.fullscreen}>
                    <i className={"fas fa-expand " + styles.fullscreen_icon}></i>
                </div>
                <div className={styles.view_start} onClick={() => { broadcast.viewer() }}>
                    방송시청
                </div>
            </div>
            <div className={styles.infobox}>
                <div className={styles.imgbox}>
                    <Skeleton shape="circle" size="auto" />
                </div>
                <div className={styles.infotextbox}>
                    <div className={styles.infotextbox_top}>
                        <span className={"color_black " + styles.infotextbox_title}>[멘토링] 자바스크립트 알고리즘 강의</span>
                    </div>
                    <div className={styles.infotextbox_bottom}>
                        <span className={"color_purple " + styles.infotextbox_nickname} >2기 김나리</span>
                    </div>
                </div>
            </div>

            <div className={styles.chatting}>
                {
                    Array.from(chat).map((v, i) => {
                        if (v.type === "chat") {
                            return (
                                <div key={`chat_${i}`} className={styles.chatting_box}>
                                    <span className={styles.chatting_nickname}>{v.nickname}</span>
                                    <span className={styles.chatting_text}>{v.message}</span>
                                </div>
                            );
                        } else if (v.type === "join") {
                            return (
                                <div key={`join_${i}`} className={styles.chatting_box}>
                                    <span className={"color_purple " + styles.chatting_join_text}>{v.message}</span>
                                </div>
                            );
                        }
                    })
                }
            </div>
            <div className={styles.chatting_form}>
                <Input className={styles.chatting_input} placeholder="채팅메시지를 입력해주세요." id="chatinput" />
                <ButtonComp width="small" type="base" className={styles.chatting_btn} textvalue="전송" onClick={() => {
                    broadcast.sendChat(document.getElementById("chatinput").value);
                }} />
            </div>
        </div >
    );
}

export default View;