import React, { useEffect, useState } from "react";
import { Navbar, Typo, Imgbox } from "src/components";
import styles from "./index.module.css";
import fire from "src/fire";
import FadeIn from "react-fade-in";

function List(props) {
    const [list, setList] = useState([]);

    function addEvent() {
        const database = fire.database();
        let chatList = database.ref(`users/chat-plover-KKHH/${getIndex()}`);
        chatList.on('value', (list) => {
            const data = list.val();
            let tempList = [];
            for (let from in data) {
                let obj = {};
                obj.fromId = from;
                for (let p in data[from]) {
                    obj.message = data[from][p].massage;
                    obj.profileImage = data[from][p].profileImage;
                    obj.sendTime = data[from][p].sendTime;
                    obj.nickname = data[from][p].writerNickName;
                }
                tempList.push(obj);
            }
            console.log(tempList);
            setList(tempList);
        });
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

    function getIndex() {
        let pathname = props.history.location.pathname;
        let arr = pathname.split("/");
        return parseInt(arr[arr.length - 1]);
    }

    return (
        <div id="chatting_list" className={styles.chatting_list}>
            <Navbar color="white">
                <span onClick={() => {
                    props.history.goBack();
                }}>
                    <i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i>
                </span>
                <span className={"color_black" + " " + styles.title}><FadeIn delay={400}><Typo ty="h4">채팅 목록</Typo></FadeIn></span>
                <span>
                    <i className={"fas fa-trash-alt " + "color_white " + styles.write_icon}></i>
                </span>
            </Navbar>
            <div className={styles.listbox}>
                <FadeIn delay={300}>
                    {
                        list.map((v, i) => {
                            return (
                                <div key={`chatbox_${i}`} className={styles.chatbox}>
                                    <div className={styles.imgbox}><Imgbox shape="circle" src={v.profileImage} className={styles.image} /></div>
                                    <div className={styles.nicknamebox}>{v.nickname}</div>
                                    <div className={styles.msgbox}>{v.message}</div>
                                    <div className={styles.datebox}>
                                        {toStr(v.sendTime)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </FadeIn>
            </div>
        </div >
    );
}

export default List;