import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Noticeslider, Skeleton } from "src/components";
import Event from "./event";

function List(props) {
  const [notices, setNotices] = useState([]);
  const [studies, setStudies] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  let state = {};
  //공지
  state.notices = notices;
  state.setNotices = setNotices;
  state.lastIndex = lastIndex;
  //스터디목록
  state.studies = studies;
  state.setStudies = setStudies;
  state.setLastIndex = setLastIndex;

  const event = new Event();
  useEffect(() => {
    event.setTarget(document.getElementById("study_list"));
    event.setState(state);
    event.addEvent();

    return () => {
      event.destroy();
    };
  }, [studies]);

  return (
    <div id="study_list" className={styles.study_list}>
      <Navbar color="white">
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">스터디 같이해요</Typo></span>
        <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
      </Navbar>
      <div className={styles.notice_box}>
        <Noticeslider data={notices} className={styles.notice} duration={2000} style={{ height: "40px" }} history={props.history} />
      </div>
      <div className={styles.studys_box}>
        {
          studies.map((study, i) => {
            return (
              <div key={"study_" + i} className={styles.study_box} data-id={study.id}>
                <div className={styles.study_left}>
                  <div className={styles.title_box} onClick={() => { props.history.push(`/study/detail/${study.id}`) }}>
                    <Typo ty="h4">{study.title}</Typo>
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
                    {/*<Imgbox src={study.profileImg} shape="circle" className={styles.profile}></Imgbox>*/}
                    <Skeleton shape="circle" className={styles.profile} />
                  </div>
                  <div className={styles.datebox}>하루전</div>
                </div>
              </div>
            )
          })
        }
      </div>
      <p id="footer"></p>
    </div>
  );
}

export default List;