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
        <div className={styles.profileImgbox}><Imgbox src="/images/bewhy.jpg" shape="circle" className={styles.profileImg} /></div>
        <div className={styles.profileTextbox}>
          <div className={styles.profileTextbox_top}><p className={styles.profileText}>bewhy_offcial</p></div>
          <div className={styles.profileTextbox_bottom}><p className={styles.datetime}>2021. 01. 18. &nbsp;&nbsp;00:32</p></div>
        </div>
      </div>
      <div className={styles.border}>
        <hr />
      </div>
      <div style={{ width: "100%", padding: "0px 10px" }}>
        <p style={{ lineHeight: "40px", minHeight: "40px" }}>알고리즘 스터디 하실 분 모집합니다.</p>
        <p style={{ lineHeight: "40px", minHeight: "40px" }} > 신체 건강하고 혈액형 O형이신 분</p>
        <p style={{ lineHeight: "40px", minHeight: "40px" }} > 해외여행에 결격 사유가 없으신 분</p>
        <p style={{ lineHeight: "40px", minHeight: "40px" }} > 가족, 친구 등 지인과의 연락이 드무신 분 우대합니다.</p>
        <p style={{ lineHeight: "40px", minHeight: "40px" }} > 채팅주세요.</p>

      </div>
      <div className={styles.border}>
        <hr />
      </div>
      {
        <div id="tags" className={styles.tags}>
          <span className={styles.tag_desc}>태그</span>
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