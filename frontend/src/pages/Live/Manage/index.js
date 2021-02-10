import React from 'react';
import styles from './index.module.css';
import { Navbar, PulseBadge, Skeleton, Input, ButtonComp } from "src/components";

function Manage(props) {

    return (
        <div id="live_manange" style={{ position: "relative", display: "flex", flexDirection: "column", width: "100%", minHeight: "100%" }}>
            <Navbar color="white">
                <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
                <span className={"color_black" + " " + styles.title}>라이브방송 관리</span>
                <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
            </Navbar>
            <div style={{ position: "relative", width: "100%", height: "300px" }}>
                <video id="live_screen" autoPlay width="100%" height="300px" style={{ background: "#eee", border: "0px solid #444", borderRadius: "5px 5px 0px 0px" }} />
                <div style={{ position: "absolute", top: "4px", left: "5px", width: "50px" }}>
                    <PulseBadge title="준비중" bg="black" style={{ position: "relative", width: "50px", height: "20px", lineHeight: "20px" }} />
                </div>
                <div style={{ position: "absolute", top: "4px", right: "3px", width: "50px", height: "20px", lineHeight: "20px" }}>
                    <i className="fas fa-user-alt" style={{ fontSize: "0.7em", color: "gray" }}></i>
                    <span style={{ fontSize: "0.7em", marginLeft: "3px" }}>100명</span>
                </div>
            </div>
            <div style={{ width: "100%", height: "30px", display: "flex", flexDirection: "row" }}>
                <div style={{ width: "70%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <button style={{ borderRadius: "2px", fontWeight: "bold", background: "linear-gradient(#00ac2d, #39d561)", color: "white", border: "0px", height: "25px", padding: "0px 4px" }}>라이브시작</button>
                    <button style={{ borderRadius: "2px", fontWeight: "bold", background: "linear-gradient(#9100ce, #a62bd9)", color: "white", border: "0px", height: "25px", marginLeft: "4px", padding: "0px 4px" }}>화면공유</button>
                </div>
                <div style={{ width: "30%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                    <button style={{ borderRadius: "2px", fontWeight: "bold", background: "#444", color: "white", border: "0px", height: "25px", marginLeft: "4px", padding: "0px 4px" }}>해상도설정</button>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "80px", lineHeight: "80px", alignItems: "center" }}>
                <div style={{ width: "40px", height: "40px", lineHeight: "40px" }}>
                    <Skeleton shape="circle" size="auto" />
                </div>
                <div style={{ flex: "1", marginLeft: "5px", height: "40px", lineHeight: "40px", display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "100%", height: "25px", lineHeight: "25px" }}>
                        <span className="color_black" style={{ fontSize: "0.9em", marginLeft: "3px", fontWeight: "600" }}>[멘토링] 자바스크립트 알고리즘 강의</span>
                    </div>
                    <div style={{ width: "100%", height: "15px", lineHeight: "15px" }}>
                        <span className="color_purple" style={{ fontSize: "0.7em", marginLeft: "3px", fontWeight: "600" }}>2기 김나리</span>
                    </div>
                </div>
            </div>

            <div className={styles.chatting} style={{ width: "100%", flex: "1", background: "white", overflowY: "scroll", display: "flex", flexDirection: "column" }}>
                <div style={{ width: "100%", lineHeight: "25px" }}>
                    <span className="color_purple" style={{ fontSize: "0.8em", fontWeight: "600" }}>5기 김영현님이 입장하셨습니다.</span>
                </div>
                <div style={{ width: "100%", lineHeight: "25px" }}>
                    <span style={{ color: "skyblue", fontSize: "0.8em", fontWeight: "bold" }}>5기 김영현</span>
                    <span style={{ color: "black", fontSize: "0.8em", marginLeft: "5px" }}>안녕하세요</span>
                </div>
                <div style={{ width: "100%", lineHeight: "25px" }}>
                    <span className="color_purple" style={{ fontSize: "0.8em", fontWeight: "600" }}>4기 임장순님이 입장하셨습니다.</span>
                </div>
                <div style={{ width: "100%", lineHeight: "25px" }}>
                    <span style={{ color: "skyblue", fontSize: "0.8em", fontWeight: "bold" }}>4기 임장순</span>
                    <span style={{ color: "black", fontSize: "0.8em", marginLeft: "5px" }}>반가워요 강의 잘들을게요</span>
                </div>
            </div>
            <div style={{ width: "100%", height: "40px", lineHeight: "40px", display: "flex", flexDirection: "row" }}>
                <Input style={{ width: "80%", height: "30px", lineHeight: "30px" }} placeholder="채팅메시지를 입력해주세요." />
                <ButtonComp width="small" type="base" style={{ width: "19%", height: "30px", lineHeight: "30px", fontSize: "0.9em" }} textvalue="전송" />
            </div>
        </div >
    );
}

export default Manage;