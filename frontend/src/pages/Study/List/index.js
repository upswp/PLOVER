import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, Noticeslider, Imgbox } from "src/components";
import Event from "./event";

function List(props) {
  const [notices, setNotices] = useState([]);
  const [studys, setStudys] = useState([]);
  let state = {};
  //공지
  state.notices = notices;
  state.setNotices = setNotices;
  //스터디목록
  state.studys = studys;
  state.setStudys = setStudys;
  const event = new Event();
  useEffect(() => {
    event.setTarget(document.getElementById("study_list"));
    event.setState(state);
    event.addEvent();

    return () => {
      event.destroy();
    };
  }, [studys]);

  return (
    <div id="study_list" style={{ position: "relative", width: "100%" }}>
      <Navbar color="white">
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">스터디 같이해요</Typo></span>
        <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
      </Navbar>
      <div style={{ width: "100%", height: "40px", padding: "0px 10px", marginTop: "20px" }}>
        <Noticeslider data={notices} style={{ height: "40px" }} duration={2000} history={props.history} />
      </div>
      <div style={{ width: "100%", padding: "0px 10px", marginTop: "20px" }}>
        {
          studys.map((study, i) => {
            return (
              <div key={"study_" + i} style={{ marginBottom: "14px", display: "flex", flexDirection: "row", width: "100%", height: "100px", border: "1px solid silver", borderRadius: "3px" }}>
                <div style={{ width: "80%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <div style={{ width: "100%", padding: "0px 15px", height: "60%", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
                    <Typo ty="h4">{study.title}</Typo>
                  </div>
                  <div style={{ width: "100%", padding: "0px 15px", height: "40%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    <div>
                      {study.tags.map((tag, i) => {
                        return (
                          <span key={"tag_" + i} className={styles.tag}>{tag}</span>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div style={{ width: "20%", height: "100%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ width: "100%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}><Imgbox src={study.profileImg} shape="circle" style={{ width: "50px", height: "50px" }}></Imgbox></div>
                  <div style={{ width: "100%", height: "30%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", fontSize: "0.7em" }} >{study.dateTime}</div>
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