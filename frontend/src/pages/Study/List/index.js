import React, { useState, useEffect, useLayoutEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Noticeslider, Skeleton, Imgbox } from "src/components";
import FadeIn from 'react-fade-in';
import Event from "./event";

let event = new Event();

function List(props) {
  const [notices, setNotices] = useState([]);
  const [studies, setStudies] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);

  useLayoutEffect(() => {
    if (!event) event = new Event();

    event.setTarget(document.getElementById("study_list"));
    event.notices(notices);
    event.setNotices(setNotices);
    event.setStudies(setStudies);
    event.setLastIndex(setLastIndex);

    return () => {
      event = null;
    };
  }, []);

  useEffect(() => {
    event.studies(studies);
    event.lastIndex(lastIndex);
    event.addEvent();

    return () => {
      if (event !== null) event.destroy();
    };
  }, [lastIndex]);

  return (
    <div id="study_list" className={styles.study_list}>
      <Navbar color="white">
        <span style={{ cursor: "pointer" }} onClick={() => {
          props.history.goBack();
        }}>
          <i className={"fas fa-chevron-left color_black " + styles.icon} style={{ cursor: "pointer" }}></i>
        </span>
        <span className={"color_black" + " " + styles.title}><FadeIn delay={400}><Typo ty="h4">스터디 같이해요</Typo></FadeIn></span>
        <span onClick={() => {
          props.history.push("/study/register");
        }}>
          <i className={"fas fa-pen color_black " + styles.write_icon} style={{ cursor: "pointer" }}></i>
        </span>
      </Navbar>
      <div className={styles.notice_box}>
        <Noticeslider data={notices} className={styles.notice} duration={2000} style={{ height: "40px" }} history={props.history} />
      </div>
      <div className={styles.studys_box}>
        <FadeIn delay={200}>
          {
            studies.map((study, i) => {
              return (
                <div key={"study_" + i} className={styles.study_box} data-id={study.id}>
                  <div className={styles.study_left}>
                    <div className={styles.title_box} onClick={() => { props.history.push(`/study/detail/${study.id}`) }}>
                      {study.title}
                    </div>
                    <div className={styles.studys}>
                      <div>
                        {study.hashtags.map((tag, i) => {
                          return (
                            <span key={"tag_" + i} className={styles.tag}>{tag.name}</span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.study_right}>
                    <div className={styles.profilebox}>
                      {<Imgbox src={`/${study.profileImageUrl}`} shape="circle" className={styles.profile}></Imgbox>}
                      {/*<Skeleton shape="circle" className={styles.profile} />*/}
                    </div>
                    <div className={styles.nicknamebox}><span className={styles.nickname}>{study.nickname}</span></div>
                    <div className={styles.datebox}>{study.date}</div>
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