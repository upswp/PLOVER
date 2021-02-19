import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Typo, Navbar, ButtonComp,
  //     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
  //     // , Badge, ButtonComp, Tabs, Input, ImgAttach, Select,
  //     // , InputTime, InputDate, Navbutton, 
} from "../../components";
import styles from "./index.module.css";
import axios from "axios";

function Verify(props) {

  const location = useLocation()

  const history = useHistory()

  const email = location.state.email

  const [num, setNum] = useState(0)

  useEffect(() => {
    if (num === 0) {
      sendEmail()
    }
    setNum(1)
  }, [])

  const sendEmail = () => {
    axios.post(process.env.REACT_APP_HOST + '/ssafy/account/verify', {
      email: email
    })
      .then((res) => {
        if (num === 1) {
          alert('이메일이 재발송되었습니다.')
        }
      }
      )
    // .catch((err) => {
    // })
  }

  return (
    <div className={styles.container}>
      <Navbar className={styles.nav}>
        <div className={styles.redirect} onClick={() => { history.push("/login") }}></div>
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">회원가입 완료</Typo></span>
        <i></i>
      </Navbar>
      <div className={styles.notice}>
        <p>PLOVER의 회원이 되신 것을 환영합니다!</p>
        <p>가입한 이메일 주소로 발송된 이메일을 확인해 주세요.</p>
      </div>
      <ButtonComp type="base" width="regular" textvalue="재발송" onClick={sendEmail}></ButtonComp>
    </div>
  )
}

export default Verify;