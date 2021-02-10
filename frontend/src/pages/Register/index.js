import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import {
  Input, ImgAttach, Select, ButtonComp, Typo, Navbar, 
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Tabs
//     // , InputTime, InputDate
} from "../../components";
import styles from "./index.module.css";
import Event from "./event";

function Register(props) {

  const history = useHistory()

  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')

  
  const onPassHandler = (event) => {
    if (event.target.id === "password") {
      setPassword(event.currentTarget.value)
    }
    if (event.target.id === "passwordConfirm") {
      setPassConfirm(event.currentTarget.value)
    }
  };
  
  const event = new Event(props.history)
  useEffect(() => {
    event.setPropic(document.getElementById('propic'))
    event.setEmail(document.getElementById('email'))
    event.setDupEmail(document.getElementById('dupEmail'))
    event.setPassword(document.getElementById('password'))
    event.setPasswordConfirm(document.getElementById('passwordConfirm'))
    event.setNickname(document.getElementById('nickname'))
    event.setDupNickname(document.getElementById('dupNickname'))
    event.setGeneration(document.getElementById('generation'))
    event.setCampus(document.getElementById('campus'))
    event.setRegister(document.getElementById('register'))
    event.addEvent()
    
    return () => {
      event.destroy()
    }
  })

  function PassConfirm() {
    const pass = document.getElementById('password')
    const confirm = document.getElementById('passwordConfirm')
    if (pass && confirm != null) {
      if (pass.value === '' || confirm.value === '') {
        return (
          <Typo ty="desc">&nbsp;</Typo>
        )
      }
      if (pass.value === confirm.value) {
        return (
          <Typo ty="desc" className={styles.yes}>비밀번호가 일치합니다.</Typo>
        )
      }
      if (pass.value !== confirm.value) {
        return (
          <Typo ty="desc" className={styles.no}>비밀번호가 일치하지 않습니다.</Typo>
        )
      }
    }
    return (
      <Typo ty="desc">&nbsp;</Typo>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
      <Navbar className={styles.nav}>
        <div className={styles.redirect} onClick={() => { history.push("/login") }}></div>
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Typo ty="h4">회원가입</Typo></span>
        <i></i>
      </Navbar>

      <div className={styles.header}></div>
      <ImgAttach id="propic" className={styles.propic}></ImgAttach>
      </div>

      <div className={styles.inputdiv}>
      <Typo className={styles.label} ty="desc">이메일</Typo>
      <div className={styles.div}>
      <Input className={styles.dupinput} id="email" type="email" placeholder="이메일을 입력하세요"></Input>
      <ButtonComp className={styles.dup} width="regular" type="base" textvalue="중복확인" id="dupEmail"></ButtonComp>
      </div>

      <Typo ty="desc" className={styles.label}>패스워드</Typo>
      <Input id="password" type="password" placeholder="패스워드를 입력하세요" onchange={onPassHandler}></Input>

      <Typo ty="desc" className={styles.label}>패스워드 확인</Typo>
      <Input id="passwordConfirm" type="password" placeholder="패스워드 확인" onchange={onPassHandler}></Input>
      <PassConfirm></PassConfirm>

      <Typo ty="desc" className={styles.label}>닉네임</Typo>
      <div className={styles.div}>
      <Input className={styles.dupinput} id="nickname" placeholder="닉네임을 입력하세요"></Input>
      <ButtonComp className={styles.dup} width="regular" type="base" textvalue="중복확인" id="dupNickname"></ButtonComp>
      </div>

      <Typo ty="desc" className={styles.label}>기수</Typo>
      <Select id="generation">
        <option value="">기수를 선택하세요</option>
        <option value="1기">1기</option>
        <option value="2기">2기</option>
        <option value="3기">3기</option>
        <option value="4기">4기</option>
        <option value="5기">5기</option>
      </Select>

      <Typo ty="desc" className={styles.label}>캠퍼스 선택</Typo>
      <Select id="campus">
        <option value="">지역을 선택하세요</option>
        <option value="서울 캠퍼스">서울 캠퍼스</option>
        <option value="대전 캠퍼스">대전 캠퍼스</option>
        <option value="광주 캠퍼스">광주 캠퍼스</option>
        <option value="구미 캠퍼스">구미 캠퍼스</option>
      </Select>

      <ButtonComp id="register" className={styles.button} width="large" type="base" textvalue="회원가입"
      onClick={() => {this.props.history.push({
        pathname: "/verify",
        state: {email: this.email}
      })}}></ButtonComp>
      </div>
    </div>
  )
};
export default Register;