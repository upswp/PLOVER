import React, { useLayoutEffect, useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Imgbox, Skeleton, PulseBadge } from "src/components";
import Event from "./event";
import FadeIn from 'react-fade-in';

let event = new Event();

function List(props) {
    const [mentoring, setMentoring] = useState([]);
    const [lastIndex, setLastIndex] = useState(0);

    useLayoutEffect(() => {
        if (!event) event = new Event();

        event.setTarget(document.getElementById("mentoring_list"));
        event.setMentoring(setMentoring);
        event.setLastIndex(setLastIndex);

        return () => {
            event = null;
        };

    }, []);

    useEffect(() => {
        event.mentoring(mentoring);
        event.lastIndex(lastIndex);
        event.addEvent();

        return () => {
            if (event !== null) event.destroy();
        };
    }, [lastIndex]);

    /*
        const [mentoring, setMentoring] = useState([{
            profileImg: "/images/mentor_1.png",
            title: "[멘토링] 모의해킹 강좌",
            type: "LIVE",
            id: 1,
        }, {
            profileImg: "/images/mentor_2.png",
            title: "[멘토링] 리눅스 개발강좌",
            type: "MEET",
            id: 2,
        }, {
            profileImg: "/images/mentor_3.png",
            title: "[모임] 알고리즘 강좌",
            type: "LIVE",
            id: 3,
        }]);
    */

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
        <div id="mentoring_list" className={styles.mentoring_list}>
            <Navbar color="white">
                <span onClick={() => {
                    props.history.goBack();
                }}>
                    <i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i>
                </span>
                <span className={"color_black" + " " + styles.title}><FadeIn delay={400}><Typo ty="h4">전체 멘토링</Typo></FadeIn></span>
                <span onClick={() => {
                    props.history.push("/mentoring/register");
                }}>
                    <i className={"fas fa-edit color_black " + styles.write_icon} style={{ cursor: "pointer" }}></i>
                </span>
            </Navbar>
            <div className={styles.mentoring_box}>
                <FadeIn delay={400}>
                    {
                        mentoring.map((m, i) => {
                            return (
                                <div key={i}>
                                    <div key={"img_" + i} className={styles.mentoring_img_box} onClick={() => { props.history.push(`/mentoring/detail/${m.id}`) }}>
                                        <Imgbox src={m.mentoringImageUrl} shape="rectRound" className={styles.mentoring_img}></Imgbox>
                                        <PulseBadge title={m.type.toUpperCase()} bg={toColor(m.type.toUpperCase())} style={{ position: "absolute", top: "3px", left: "3px" }} />
                                    </div>
                                    <div key={"m_" + i} className={styles.m_box}>
                                        <div className={styles.m_left}>
                                            <div className={styles.title_box} onClick={() => { props.history.push(`/mentoring/detail/${m.id}`) }}>
                                                {m.title}
                                            </div>
                                            <div className={styles.datetime}>
                                                <i className="far fa-clock"></i>&nbsp;<span>{`${m.startDate.slice(5)}(${toDay(m.startDate)}) ${m.startTime.slice(0, 5)}~${m.endDate.slice(5)}(${toDay(m.endDate)}) ${m.endTime.slice(0, 5)} ${m.place ? m.place : ""}`}</span>
                                            </div>
                                            <div className={styles.personnel}>
                                                <i className={"fas fa-user"} style={{ fontSize: "1.0em" }}></i>&nbsp;<span>모집인원 : {m.type === "meet" ? `${m.maxPersonnel}명` : "인원제한없음"}</span>
                                            </div>
                                        </div>
                                        <div className={styles.m_right}>
                                            <div className={styles.profilebox}>
                                                <Imgbox src={m.profileImageUrl} shape="circle" className={styles.profile}></Imgbox>
                                                {/*<Skeleton shape="circle" className={styles.profile} />*/}
                                                <div className={styles.profile_box_shiny}></div>
                                            </div>
                                            <div className={styles.nicknamebox}><span className={m.nickname}>{m.nickName}</span></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </FadeIn>
            </div>
            {<p id="footer" style={{ height: "20px", textAlign: "center" }}> {lastIndex !== -1 && <img src={"/images/loading.svg"} />}</p>}
        </div>
    );
}

export default List;