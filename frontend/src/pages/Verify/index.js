import React from 'react';
import {
  Typo, Navbar,
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Tabs, Input, ImgAttach, Select, ButtonComp, 
//     // , InputTime, InputDate, Navbutton, 
} from "../../components";
import styles from "./index.module.css";
import axios from "axios";

function Verify (props) {

  const sendEmail = () => {
    axios.post('')
  }

  return (
    <div className={styles.container}>
      <Navbar className={styles.nav}>
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}
        onClick={() => { props.history.push('/login') }}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">회원가입 완료</Typo></span>
        <i></i>
      </Navbar>
    <p>PLOVER의 회원이 되신 것을 환영합니다!</p>
    <p>가입한 이메일 주소로 발송된 이메일을 확인해 주세요.</p>
    </div>
  )
}

export default Verify;