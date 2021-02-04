import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Imgbox, ButtonComp } from "src/components";
import Event from "./event";

function Detail(props) {
  let [tags, setTags] = useState(["#태그1", "#태그2"]);
  let state = {};
  state.tags = tags;
  state.setTags = setTags;

  useEffect(() => {
    const event = new Event(document.getElementById("study_detail"), state);
    return () => {
      event.destroy();
    };
  }, []);

  return (
    <div id="study_detail">
      <Navbar color="white">
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">스터디 상세보기</Typo></span>
        <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
      </Navbar>
      <div className={styles.study_title}>
        <Typo ty="h4">알고리즘 스터디 하실분 ~</Typo>
      </div>
      <div className={styles.info_box}>
        <div style={{ width: "20%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}><Imgbox src="/images/bewhy.jpg" shape="circle" style={{ width: "50px", height: "50px" }} /></div>
        <div style={{ width: "80%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: "50%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}><p style={{ fontWeight: "bold" }}>bewhy_offcial</p></div>
          <div style={{ width: "100%", height: "50%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}><p style={{ fontSize: "0.7em", height: "30px", lineHeight: "30px", color: "#555" }}>2021. 01. 18. &nbsp;&nbsp;00:32</p></div>
        </div>
      </div>
      <div className={styles.border}>
        <hr />
      </div>
      <div style={{ width: "100%", padding: "0px 10px" }}>
        <p style={{ height: "40px", lineHeight: "40px" }}>알고리즘 스터디 하실 분 모집합니다.</p>
        <p style={{ height: "40px", lineHeight: "40px" }} > 신체 건강하고 혈액형 O형이신 분</p>
        <p style={{ height: "40px", lineHeight: "40px" }} > 해외여행에 결격 사유가 없으신 분</p>
        <p style={{ height: "40px", lineHeight: "40px" }} > 가족, 친구 등 지인과의 연락이 드무신 분 우대합니다.</p>
        <p style={{ height: "40px", lineHeight: "40px" }} > 채팅주세요.</p>

      </div>
      <div className={styles.border}>
        <hr />
      </div>
      {
        <div id="tags" className={styles.tags}>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>태그</span>
          {
            tags.map((v, i) => {
              return (
                <span className={styles.tag} key={"tag_" + i}>{v}</span>
              )
            })
          }
        </div>
      }
      <div className={styles.tag_border}>
        <hr />
      </div>
      <div className={styles.button_box}>
        <ButtonComp width="large" type="base" textvalue="채팅하기" className={styles.button} />
      </div>
    </div >
  );
}

export default Detail;