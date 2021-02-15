import React, { useLayoutEffect, useState } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Imgbox, Skeleton, PulseBadge, ButtonComp, Input } from "src/components";

function Detail(props) {


    useLayoutEffect(() => {

    }, []);

    return (
        <div id="mentoring_detail" className={styles.mentoring_detail}>
            <Navbar color="white">
                <span onClick={() => {

                }}>
                    <i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i>
                </span>
                <span className={"color_black" + " " + styles.title}><Typo ty="h4">멘토링 상세보기</Typo></span>
                <span>
                    <i className={"fas fa-edit color_white " + styles.write_icon}></i>
                </span>
            </Navbar>

            <div className={styles.mentoring_img_box}>
                <Imgbox src={"/images/mentor_1.png"} shape="rectRound" className={styles.mentoring_img}></Imgbox>
                <PulseBadge title={"LIVE"} bg={"purple"} style={{ position: "absolute", top: "3px", left: "3px" }} />
            </div>
            <div className={styles.m_box}>
                <div className={styles.m_left}>
                    <div className={styles.title_box} onClick={() => { props.history.push(`/mentoring/detail/`) }}>
                        [멘토링] 모의해킹 강좌
                    </div>
                    <div className={styles.datetime}>
                        <i className="far fa-clock"></i>&nbsp;<span>시작날짜~종료날짜</span>
                    </div>
                    <div className={styles.personnel}>
                        <span style={{ color: "skyblue", fontWeight: "bold" }}>라이브 방송예정</span>&nbsp;&nbsp;<i className={"fas fa-user"} style={{ fontSize: "1.0em" }}></i>&nbsp;<span>인원제한없음</span>
                    </div>
                </div>
                <div className={styles.m_right}>
                    <div className={styles.profilebox}>
                        {/*<Imgbox src={study.profileImg} shape="circle" className={styles.profile}></Imgbox>*/}
                        <Skeleton shape="circle" className={styles.profile} />
                    </div>
                    <div className={styles.nicknamebox}><span className={styles.nickname}>닉네임</span></div>
                </div>
            </div>
            <div style={{ width: "100%", fontSize: "0.8em" }} id="content" dangerouslySetInnerHTML={{
                __html: `<p style="line-height:22px;min-height:22px;">DFS, BFS, DP, 그리디, 그래프, 고급 자료구조 등 고급 알고리즘과 문제
                        해결기법을 다루는 단계입니다. 본격적으로 대회를 준비하거나 높은 수
                        준의 코딩 테스트를 대비하시는 분들을 대상으로 합니다. 
                        실제 다양한 온라인 저지와 온라인 콘테스트 사이트를 이용해 실전적으
                        로 문제를 풀어갑니다. 글로 배우기 어려웠던 내용들을 정리하고 실제로
                        문제에 적용/응용하며 수 많은 문제를 풀어나가게 됩니다.</p>` }}>
            </div>
            <div className={styles.button_box}>
                <ButtonComp width="large" type="base" textvalue="라이브 보러가기" className={styles.button} />
            </div>
            <div className={styles.qna_title}>
                멘토링 문의
            </div>
            <div>
                <Input placeholder="문의내용을 입력해주세요." type="text" className={styles.input_text} />
            </div>
            <div style={{ width: "100%", height: "40px", lineHeight: "40px", textAlign: "right" }}>
                <button className={styles.input_btn}>작성하기</button>
            </div>
            <div className={styles.qna_num}>
                총 5개의 문의
            </div>
            <div className={styles.que_box}>
                <div className={styles.que_box_left}>
                    <div className={styles.que_profile_box}><Skeleton shape="circle" className={styles.profile} /></div>
                    <div className={styles.que_nickname_box}>닉네임</div>
                </div>
                <div className={styles.que_box_right}>
                    <div className={styles.que_content}>
                        멘토님 그래프 기초가 부족한데 수업을 들어도 괜찮을까요 ??
                    <div className={styles.que_datetime}>1시간전</div>
                    </div>
                </div>
            </div>
            <div className={styles.ans_box}>
                <div className={styles.ans_profile_box}>
                    <Skeleton shape="circle" className={styles.ans_profile} />&nbsp;김영현 멘토님의 답변
                </div>
                <div className={styles.ans_content}>기초가 부족해도 이해할 수 있는 수준의 강의입니다.</div>
                <div className={styles.ans_datetime}>5분전</div>
            </div>
            <div style={{ width: "100%", height: "20px" }}></div>
        </div>
    );
}

export default Detail;