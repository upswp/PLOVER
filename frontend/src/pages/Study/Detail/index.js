import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Imgbox, ButtonComp, Skeleton } from "src/components";
import FadeIn from 'react-fade-in';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Event from "./event";

let viewer = null;

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
    console.log(state.study.no);
    event.setTarget(document.getElementById("study_detail"));
    event.setState(state);
    console.log(state);
    if (state.study) {
      viewer = new Viewer({
        el: document.querySelector('#content'),
        height: '100%',
        initialValue: state.study.content
      });
    }
    return () => {
      //event.destroy();
    };
  }, [tags, study]);

  return (
    <div id="study_detail">
      <Navbar color="white">
        <span onClick={() => {
          console.log("backbtn")
          props.history.goBack();
        }}><i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i></span>
        <span className={"color_black" + " " + styles.title}><FadeIn delay={400}><Typo ty="h4">스터디 상세보기</Typo></FadeIn></span>
        <span style={{ cursor: "pointer" }} key={(localStorage.getItem('email') === state.study.email ? "edit" : "no_edit")} onClick={() => {
          if (localStorage.getItem('email') === state.study.email) props.history.replace(`/study/edit/${event.getIndex()}`);
        }}>
          <i className={"fas fa-user-edit " + "color_black " + styles.write_icon} style={{ visibility: (localStorage.getItem('email') === state.study.email ? "visible" : "hidden") }}></i>
        </span>
        <span style={{ cursor: "pointer" }} key={(localStorage.getItem('email') === state.study.email ? "delete" : "no_delete")} onClick={() => {
          if (localStorage.getItem('email') === state.study.email) event.deleteStudy();
        }}>
          <i className={"fas fa-trash-alt " + "color_black " + styles.write_icon} style={{ visibility: (localStorage.getItem('email') === state.study.email ? "visible" : "hidden") }}></i>
        </span>
      </Navbar>
      <FadeIn delay={200}>
        <div className={styles.study_title}>
          <Typo ty="h4">{state.study.title !== undefined && state.study.title}</Typo>
        </div>
        <div className={styles.info_box}>
          <div className={styles.profileImgbox}>
            <Imgbox src={`/${study.profileImageUrl}`} shape="circle" className={styles.profileImg}></Imgbox>
            {/*<Skeleton shape="circle" className={styles.profileImg} />*/}
          </div>
          <div className={styles.profileTextbox}>
            <div className={styles.profileTextbox_top}><p className={styles.profileText}>{state.study.nickName !== undefined && state.study.nickName}</p></div>
            <div className={styles.profileTextbox_bottom}><p className={styles.datetime}>{state.study.createDate !== undefined && event.getDate(state.study.createDate)}</p></div>
          </div>
        </div>
        <div className={styles.border}>
          <hr />
        </div>
        <div style={{ width: "100%", padding: "0px 10px" }} id="content">
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
          <ButtonComp width="large" type="base" textvalue="채팅하기" className={styles.button} onClick={() => {
            if (localStorage.getItem('id') == state.study.no) props.history.push(`/chat/list/${state.study.no}`);
            else props.history.push(`/chat/view/${state.study.no}`);
          }} />
        </div>
      </FadeIn>
    </div >
  );
}

export default Detail;