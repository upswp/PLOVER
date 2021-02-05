import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Imgbox, ButtonComp, Skeleton } from "src/components";
import Event from "./event";

function Detail(props) {
  let [tags, setTags] = useState([]);
  let [study, setStudy] = useState({});
  let state = {};
  state.tags = tags;
  state.setTags = setTags;
  state.study = study;
  state.setStudy = setStudy;

  let event = new Event(props.history);

  useEffect(() => {
    event.getStudy();
  }, []);

  useEffect(() => {
    event.setTarget(document.getElementById("study_detail"));
    event.setState(state);

    return () => {
      //event.destroy();
    };
  }, [tags, study]);

  return (
    <div id="study_detail">
      <Navbar color="white">
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">스터디 상세보기</Typo></span>
        <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
      </Navbar>
      <div className={styles.study_title}>
        <Typo ty="h4">{state.study.title !== undefined && state.study.title}</Typo>
      </div>
      <div className={styles.info_box}>
        <div className={styles.profileImgbox}>
          {/*<Imgbox src="/images/bewhy.jpg" shape="circle" className={styles.profileImg} />*/}
          <Skeleton shape="circle" className={styles.profileImg} />
        </div>
        <div className={styles.profileTextbox}>
          <div className={styles.profileTextbox_top}><p className={styles.profileText}>{state.study.nickName !== undefined && state.study.nickName}</p></div>
          <div className={styles.profileTextbox_bottom}><p className={styles.datetime}>{(state.study.createDate + "").split("T")[0] + " " + (state.study.createDate + "").split("T")[1].split(".")[0]}</p></div>
        </div>
      </div>
      <div className={styles.border}>
        <hr />
      </div>
      <div style={{ width: "100%", padding: "0px 10px" }} id="content" dangerouslySetInnerHTML={{ __html: state.study.content }}>
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
                <span className={styles.tag} key={"tag_" + i}>{v.name}</span>
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