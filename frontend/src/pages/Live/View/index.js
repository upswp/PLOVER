import React from 'react';
import styles from './index.module.css';
import { Navbar, PulseBadge, Skeleton, Input, ButtonComp } from "src/components";

function View(props) {

    return (
        <div id="live_view" className={styles.live_view}>
            <Navbar color="white">
                <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
                <span className={"color_black" + " " + styles.title}>라이브방송 보기</span>
                <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
            </Navbar>
            <div className={styles.live_box}>
                <video id="live_screen" className={styles.live_screen} autoPlay />
                <div className={styles.badge_box}>
                    <PulseBadge className={styles.badge} title="준비중" bg="black" />
                </div>
                <div className={styles.viewrate_box}>
                    <i className={"fas fa-user-alt " + styles.viewicon}></i>
                    <span className={styles.viewtext}>100명</span>
                </div>
                <div className={styles.fullscreen}>
                    <i className={"fas fa-expand " + styles.fullscreen_icon}></i>
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
                <div className={styles.chatting_box}>
                    <span className={"color_purple " + styles.chatting_join_text}>5기 김영현님이 입장하셨습니다.</span>
                </div>
                <div className={styles.chatting_box}>
                    <span className={styles.chatting_nickname}>5기 김영현</span>
                    <span className={styles.chatting_text}>안녕하세요</span>
                </div>
                <div className={styles.chatting_box}>
                    <span className={"color_purple " + styles.chatting_join_text}>4기 임장순님이 입장하셨습니다.</span>
                </div>
                <div style={{ width: "100%", lineHeight: "25px" }}>
                    <span className={styles.chatting_nickname}>4기 임장순</span>
                    <span className={styles.chatting_text}>반가워요 강의 잘들을게요</span>
                </div>
            </div>
            <div className={styles.chatting_form}>
                <Input className={styles.chatting_input} placeholder="채팅메시지를 입력해주세요." />
                <ButtonComp width="small" type="base" className={styles.chatting_btn} textvalue="전송" />
            </div>
        </div >
    );
}

export default View;