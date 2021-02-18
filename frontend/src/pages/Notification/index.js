import React, { useEffect, useState } from 'react'
import { Typo, Navbar } from '../../components'
import styles from './index.module.css'
import fire from "src/fire";
import FadeIn from "react-fade-in";


function Notification(props) {
  const [list, setList] = useState([]);

  function getParameter() {
    let pathname = props.history.location.pathname;
    let arr = pathname.split("/");
    return arr[arr.length - 1];
  }

  function addEvent() {
    let nickname = getParameter();
    console.log(nickname)
    if (!nickname) props.history.goBack();

    const database = fire.database();
    let notifications = database.ref(`users/${nickname}`);
    notifications.on('value', (list) => {
      const data = list.val();
      let temp = [];
      for (let key in data) {
        temp.push({
          message: data[key].message,
          time: data[key].createDateTime
        })
      }
      setList(temp);
    });
  }

  function toStr(value) {
    let today = new Date();
    let timevalue = new Date(value);
    let betweenT = Math.floor((today.getTime() - timevalue.getTime()) / 1000 / 60);
    if (betweenT < 1) return '방금전';
    if (betweenT < 60) {
      return `${betweenT}분전`;
    }
    let betweenH = Math.floor(betweenT / 60);
    if (betweenH < 24) {
      return `${betweenH}시간전`;
    }
    let betweenTD = Math.floor(betweenH / 60 / 24);
    if (betweenTD < 365) {
      return `${betweenTD}일전`;
    }
    return `${Math.floor(betweenTD / 365)}년전`;
  }

  useEffect(() => {
    addEvent();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar className={styles.nav}>
        <div className={styles.redirect} onClick={() => { props.history.push("/login") }}></div>
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">알림</Typo></span>
      </Navbar>
      <div className={styles.listbox}>
        <FadeIn delay={300}>
          {
            list.map((v, i) => {
              return (
                <div key={`chatbox_${i}`} className={styles.chatbox} style={{ cursor: "pointer" }} onClick={() => {
                  props.history.push(`/profile/${localStorage.getItem('id')}`);
                }}>
                  <div className={styles.msgbox}><i className="fas fa-heart color_red"></i>&nbsp;{v.message}</div>
                  <div className={styles.datebox}>
                    {toStr(v.time)}
                  </div>
                </div>
              )
            })
          }
        </FadeIn>
      </div>
    </div>
  )
}

export default Notification;