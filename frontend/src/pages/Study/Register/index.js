import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Input, ButtonComp } from "src/components";
import Event from "./event";

function Register(props) {
  let [tags, setTags] = useState([]);
  let state = {};
  state.tags = tags;
  state.setTags = setTags;
  const event = new Event(props.history);
  useEffect(() => {
    event.setState(state);
    event.setTarget(document.getElementById("study_register"));
    event.setTitle(document.getElementById("title"));
    event.setContent(document.getElementById("content"));
    event.addEvent();

    return () => {
      event.destroy();
    };
  }, [tags]);

  return (
    <div id="study_register">
      <Navbar color="white">
        <span onClick={() => {
          props.history.goBack();
        }}>
          <i className={"fas fa-chevron-left color_black" + " " + styles.icon} style={{ cursor: "pointer" }}></i>
        </span>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">스터디 등록</Typo></span>
        <i className={"fas fa-pen color_white" + " " + styles.right_icon}></i>
      </Navbar>
      <div className={styles.desc}>
        <Typo ty="p">제목</Typo>
      </div>
      <div className={styles.input_text_box}>
        <Input id="title" placeholder="제목을 입력해주세요." type="text" className={styles.input_text} />
      </div>
      <div className={styles.desc}>
        <Typo ty="p">내용</Typo>
      </div>
      <div className={styles.textarea_box}>
        <textarea id="content" placeholder="내용을 입력해주세요." type="text" className={styles.textarea} />
      </div>
      <div className={styles.desc}>
        <Typo ty="p">태그</Typo>
      </div>
      <div className={styles.input_text_box}>
        <Input id="input_tag" placeholder="태그를 입력해주세요. ex) Tag1 Tag2" type="text" className={styles.input_text} />
      </div>
      {tags.length > 0 && <div id="tags" className={styles.desc}>
        {
          tags.map((v, i) => {
            return (
              <span className={styles.tag} key={"tag_" + i}>{v}</span>
            )
          })
        }
      </div>}
      <div className={styles.button_box}>
        <ButtonComp id="register_btn" width="large" type="base" textvalue="등록하기" className={styles.button} />
      </div>
    </div>
  );
}

export default Register;