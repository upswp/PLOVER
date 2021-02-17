import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Imgbox, Skeleton, PulseBadge, ButtonComp, Input } from "src/components";
import Event from "./event";
import FadeIn from 'react-fade-in';

function Detail(props) {

    let [mentoring, setMentoring] = useState({});

    let event = new Event(props.history);

    useEffect(() => {
        event.getMentoring();
    }, []);

    useEffect(() => {
        event.setTarget(document.getElementById("mentoring_detail"));
        event.mentoring(mentoring);
        event.setMentoring(setMentoring);

    }, [mentoring]);

    function toColor($value) {
        let result = "black";
        switch ($value) {
            case "MEET":
                result = "purple";
                break;
            case "CHAT":
                result = "blue";
                break;
        }
        return result;
    }

    function toDay($value) {
        let arr = ['일', '월', '화', '수', '목', '금', '토'];
        return arr[new Date($value).getDay()];
    }

    return (
        <div id="mentoring_detail" className={styles.mentoring_detail}>
            <Navbar color="white">
                <span onClick={() => {
                    props.history.goBack();
                }}>
                    <i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i>
                </span>
                <span className={"color_black" + " " + styles.title}><FadeIn delay={400}><Typo ty="h4">멘토링 상세보기</Typo></FadeIn></span>
                <span>
                    <i className={"fas fa-edit color_white " + styles.write_icon}></i>
                </span>
            </Navbar>
            <FadeIn delay={200}>
                <div className={styles.mentoring_img_box}>
                    <Imgbox src={mentoring.mentoringImageUrl ? mentoring.mentoringImageUrl : ""} shape="rectRound" className={styles.mentoring_img}></Imgbox>
                    <PulseBadge title={mentoring.type ? mentoring.type.toUpperCase() : ""} bg={mentoring.type ? toColor(mentoring.type.toUpperCase()) : "purple"} style={{ position: "absolute", top: "3px", left: "13px" }} />
                </div>
                <div className={styles.m_box}>
                    <div className={styles.m_left}>
                        <div className={styles.title_box}>
                            {mentoring.title ? mentoring.title : ""}
                        </div>
                        <div className={styles.datetime}>
                            <i className="far fa-clock"></i>&nbsp;<span>{`${mentoring.startDate ? mentoring.startDate.slice(5) : ""}(${mentoring.startDate ? toDay(mentoring.startDate) : ""}) ${mentoring.startTime ? mentoring.startTime.slice(0, 5) : ""}~${mentoring.endDate ? mentoring.endDate.slice(5) : ""}(${mentoring.endDate ? toDay(mentoring.endDate) : ""}) ${mentoring.endTime ? mentoring.endTime.slice(0, 5) : ""} ${mentoring.place ? mentoring.place : ""}`}</span>
                        </div>
                        <div className={styles.personnel}>
                            <span style={{ color: "skyblue", fontWeight: "bold" }}></span><i className={"fas fa-user"} style={{ fontSize: "1.0em" }}></i>&nbsp;<span>모집인원 : {mentoring.type === "meet" ? `${mentoring.maxPersonnel}명` : "인원제한없음"}</span>
                        </div>
                    </div>
                    <div className={styles.m_right}>
                        <div className={styles.profilebox}>
                            <Imgbox src={mentoring.profileImageUrl ? mentoring.profileImageUrl : ""} shape="circle" className={styles.profile}></Imgbox>
                            {/*<Skeleton shape="circle" className={styles.profile} />*/}
                            <div className={styles.profile_box_shiny}></div>
                        </div>
                        <div className={styles.nicknamebox}><span className={styles.nickname}>{mentoring.nickName ? mentoring.nickName : ""}</span></div>
                    </div>
                </div>
                <div style={{ width: "100%", fontSize: "0.8em", padding: "0px 10px" }} id="content" dangerouslySetInnerHTML={{
                    __html: `${mentoring.content ? mentoring.content : ""}`
                }}>
                </div>
                <div className={styles.button_box}>
                    <ButtonComp width="large" type="base" textvalue={mentoring.type === "live" ? "라이브 보러가기" : "채팅하기"} className={styles.button} />
                </div>
                <div className={styles.qna_title}>
                    멘토링 문의
            </div>
                <div style={{ padding: "0px 10px" }}>
                    <Input placeholder="문의내용을 입력해주세요." type="text" className={styles.input_text} />
                </div>
                <div style={{ width: "100%", height: "40px", lineHeight: "40px", textAlign: "right", padding: "0px 10px" }}>
                    <button className={styles.input_btn}>작성하기</button>
                </div>
                <div className={styles.qna_num} style={{ padding: "0px 10px" }}>
                    총 5개의 문의
            </div>
                <div className={styles.que_box}>
                    <div className={styles.que_box_left}>
                        <div className={styles.que_profile_box}><Skeleton shape="circle" className={styles.profile} /></div>
                        <div className={styles.que_nickname_box}>닉네임</div>
                    </div>
                    <div className={styles.que_box_right}>
                        <div className={styles.que_content}>
                            멘토님 기초가 부족한데 수업을 들어도 괜찮을까요 ??
                    <div className={styles.que_datetime}>1시간전</div>
                        </div>
                    </div>
                </div>
                {/*
            <div className={styles.ans_box}>
                <div className={styles.ans_profile_box}>
                    <Skeleton shape="circle" className={styles.ans_profile} />&nbsp;김영현 멘토님의 답변
                </div>
                <div className={styles.ans_content}>기초가 부족해도 이해할 수 있는 수준의 강의입니다.</div>
                <div className={styles.ans_datetime}>5분전</div>
            </div>
            */}
            </FadeIn>
            <div style={{ width: "100%", height: "20px" }}></div>
        </div>
    );
}

export default Detail;