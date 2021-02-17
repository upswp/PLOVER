import React, { useEffect, useRef, useState } from "react";
import { Navbar, Typo, Input, ButtonComp, Imgbox } from "src/components";
import fire from "src/fire";
import styles from "./index.module.css";
import FadeIn from "react-fade-in";
import restapi from "src/api/restapi";

function View(props) {
    const [list, setList] = useState([]);
    const scrollRef = useRef();

    function addEvent() {
        let my = localStorage.getItem('id');
        if (!my) {
            props.history.goBack();
            return;
        }
        if (isNaN(getIndex())) {
            props.history.goBack();
            return;
        }
        //console.log(my);

        const database = fire.database();
        let chatList = database.ref(`users/chat-plover-KKHH/${my}/${getIndex()}`);
        chatList.on('value', (list) => {
            const data = list.val();
            let temp = [];
            for (let key in data) {
                temp.push(data[key]);
            }
            setList(temp);
        });
    }

    function getIndex() {
        let pathname = props.history.location.pathname;
        let arr = pathname.split("/");
        return parseInt(arr[arr.length - 1]);
    }

    function toStr(value) {
        let today = new Date();
        let timevalue = new Date(value);
        let betweenT = Math.floor((today.getTime() - timevalue.getTime()) / 1000 / 60);
        if (betweenT < 1) return '방금전';
        if (betweenT < 60) {
            return `${betweenT}분전`;
        }
        let betweenH = Math.floor(betweenT / 60);
        if (betweenH < 24) {
            return `${betweenH}시간전`;
        }
        let betweenTD = Math.floor(betweenH / 60 / 24);
        if (betweenTD < 365) {
            return `${betweenTD}일전`;
        }
        return `${Math.floor(betweenTD / 365)}년전`;
    }

    useEffect(() => {
        addEvent();
    }, []);

    return (
        <div className={styles.chatting_view}>
            <Navbar color="white">
                <span onClick={() => {
                    props.history.goBack();
                }}>
                    <i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i>
                </span>
                <span className={"color_black" + " " + styles.title}><FadeIn delay={400}><Typo ty="h4">채팅하기</Typo></FadeIn></span>
                <span>
                    <i className={"fas fa-trash-alt " + "color_white " + styles.write_icon}></i>
                </span>
            </Navbar>
            <div className={styles.chatting} ref={scrollRef}>
                <FadeIn delay={100}>
                    {
                        list.map((chat, i) => {
                            if (chat.nickname !== localStorage.getItem('nickname')) {
                                return (
                                    <div key={"chat_" + i} className={styles.chat_box}>
                                        <div className={styles.chat_box_left}>
                                            <div className={styles.chat_profile_box}><Imgbox src={chat.profileImage} shape="circle" className={styles.profile} /></div>
                                            <div className={styles.chat_nickname_box}>{chat.writerNickName}</div>
                                        </div>
                                        <div className={styles.chat_box_right}>
                                            <div className={styles.chat_content}>
                                                {chat.massage}
                                            </div>
                                            <div className={styles.chat_datetime} style={{ cursor: "pointer" }}>{toStr(chat.sendTime)}</div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={styles.chat_my}>
                                        <div className={styles.chat_box_my}>
                                            <div className={styles.chat_my_content}>
                                                {chat.massage}
                                            </div>
                                            <div className={styles.chat_my_datetime} style={{ cursor: "pointer" }}>{chat.sendTime}</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </FadeIn>
            </div>
            <div className={styles.chatting_form}>
                <Input className={styles.chatting_input} placeholder="채팅메시지를 입력해주세요." id="chatinput" onkeypress={(e) => {
                    if (e.key === "Enter") {
                        restapi.post(`/chat/message/send`, {
                            message: e.target.value,
                            toUserNo: getIndex()
                        }).then(res => {
                            e.target.value = "";
                        });
                    }
                }} />
                <ButtonComp width="small" type="base" className={styles.chatting_btn} textvalue="전송" onClick={() => {
                    restapi.post(`/chat/message/send`, {
                        message: document.getElementById("chatinput")[0].value,
                        toUserNo: getIndex()
                    }).then(res => {
                        document.getElementById("chatinput")[0].value = "";
                    });
                }} />
            </div>
        </div>
    );
}

export default View;