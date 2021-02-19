import React, { useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react';
import styles from './index.module.css';
import { Navbar, PulseBadge, Skeleton, Input, ButtonComp, Imgbox } from "src/components";
import Broadcast from "src/lib/broadcast";
import queryString from "query-string";
import FadeIn from 'react-fade-in';
import restapi from "src/api/restapi";

let broadcast = new Broadcast();

function Manage(props) {
    const scrollRef = useRef();
    const [mentoring, setMentoring] = useState({});
    const [chat, addChat] = useState([]);
    const [viewNum, setViewNum] = useState(0);
    const [mainScreen, setMainScreen] = useState("video1");
    const query = queryString.parse(props.location.search);

    useEffect(() => {
        console.log("useEffect");

        restapi.get(`/mentoring/${query.id}`).then(res => {
            setMentoring(res.data.data);
        })

        broadcast.createSocketClient(query.b_addr, localStorage.getItem("nickname"));
        broadcast.setVideo(document.getElementById("live_screen"));
        broadcast.setVideo2(document.getElementById("live_screen2"));
        broadcast.setChat(chat);
        broadcast.setAddChat(addChat);
        broadcast.mainScreen(mainScreen);
        broadcast.setMainScreen(setMainScreen);
        broadcast.setViewNum(setViewNum);
        broadcast.createSocketEvent();

        return () => {
            broadcast.stop();
            broadcast.$ws.disconnect();
        };
    }, []);

    let scrollBottom = useCallback(() => {
        console.log("callback")
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [chat]);

    useEffect(() => {
        console.log(chat);
        broadcast.setChat(chat);
        scrollBottom();
    }, [chat]);

    useEffect(() => {
        broadcast.mainScreen(mainScreen);
    }, [mainScreen]);

    return (
        <div id="live_manange" className={styles.live_manage}>
            <Navbar color="white">
                <span style={{ cursor: "pointer" }} onClick={
                    () => {
                        props.history.goBack();
                    }
                }><i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i></span>
                <span className={"color_black" + " " + styles.title}><FadeIn delay={400}>라이브방송 관리</FadeIn></span>
                <span><i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i></span>
            </Navbar>
            <div className={styles.live_box}>
                <video id="live_screen" loop className={mainScreen === "video1" ? styles.live_screen : styles.live_screen2} autoPlay onClick={() => {
                    if (mainScreen === "video2") {
                        setMainScreen("video1");
                    }
                }} />
                <video id="live_screen2" className={mainScreen === "video2" ? styles.live_screen : styles.live_screen2} autoPlay onClick={() => {
                    if (mainScreen === "video1") {
                        setMainScreen("video2");
                    }
                }} />
                <div className={styles.badge_box}>
                    <PulseBadge className={styles.badge} title="준비중" bg="black" />
                </div>
                <div className={styles.viewrate_box}>
                    <i className={"fas fa-user-alt " + styles.viewicon}></i>
                    <span className={styles.viewtext}>{`${viewNum}명`}</span>
                </div>
            </div>
            <div className={styles.configbox}>
                <div className={styles.configbox_left}>
                    <button className={styles.live_btn} onClick={() => {
                        broadcast.live();//
                    }}>라이브시작</button>
                </div>
                <div className={styles.configbox_right}>
                </div>
            </div>
            <FadeIn delay={200}>
                <div className={styles.infobox}>
                    <div className={styles.imgbox}>
                        <Imgbox src={mentoring.profileImageUrl} shape="circle" size="auto" className={styles.image} />
                    </div>
                    <div className={styles.infotextbox}>
                        <div className={styles.infotextbox_top}>
                            <span className={"color_black " + styles.infotextbox_title}>{mentoring.title ? mentoring.title : ""}</span>
                        </div>
                        <div className={styles.infotextbox_bottom}>
                            <span className={"color_purple " + styles.infotextbox_nickname} >{mentoring.nickName ? mentoring.nickName : ""}</span>
                        </div>
                    </div>
                </div>
            </FadeIn>

            <div className={styles.chatting} ref={scrollRef}>
                <FadeIn delay={100}>
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

                </FadeIn>
            </div>
            <div className={styles.chatting_form}>
                <Input className={styles.chatting_input} placeholder="채팅메시지를 입력해주세요." id="chatinput" onkeypress={(e) => {
                    if (e.key === "Enter") {
                        broadcast.sendChat(e.target.value);
                        e.target.value = "";
                    }
                }} />
                <ButtonComp width="small" type="base" className={styles.chatting_btn} textvalue="전송" onClick={() => {
                    broadcast.sendChat(document.getElementById("chatinput").value);
                }} />
            </div>
        </div >
    );
}

export default Manage;