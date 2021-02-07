import React, { useState, useEffect } from "react";
import {
  Input, ImgAttach, Select, ButtonComp, Typo, Navbar, 
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Tabs
//     // , InputTime, InputDate
} from "../../components";
import styles from "./index.module.css";
import Event from "./event";

function Register(props) {
  
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
    event.setTarget(document.getElementById('register_btn'))
    event.addEvent()
    
    return () => {
      event.destroy()
    }
  })

  return (
        <div className={styles.container}>
          <div className={styles.head}>
          <Navbar className={styles.nav}>
            <i className={"fas fa-chevron-left color_black" + " " + styles.icon}
            onClick={() => { props.history.push('/login') }}></i>
            <span className={"color_black" + " " + styles.title}><Typo ty="h4">회원가입</Typo></span>
            <i></i>
          </Navbar>

          <div className={styles.header}></div>
          <ImgAttach id="propic" className={styles.propic}></ImgAttach>
          </div>
    
          <div className={styles.inputdiv}>
          <Typo ty="desc" className={styles.label}>이메일</Typo>
          <Input id="email" type="email" placeholder="이메일을 입력하세요"></Input>
          <button id="dupEmail">중복확인</button>
    
          <Typo ty="desc" className={styles.label}>패스워드</Typo>
          <Input id="password" type="password" placeholder="패스워드를 입력하세요"></Input>
    
          <Typo ty="desc" className={styles.label}>패스워드 확인</Typo>
          <Input id="passwordConfirm" type="password" placeholder="패스워드 확인"></Input>

          <Typo ty="desc" className={styles.label}>닉네임</Typo>
          <Input id="nickname" placeholder="닉네임을 입력하세요"></Input>
          <button id="dupNickname">중복확인</button>
    
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
    
          <ButtonComp id="register_btn" className={styles.button} width="large" type="base" textvalue="회원가입"></ButtonComp>
          </div>
        </div>
  )
};
export default Register;


  // let [email, setEmail] = useState("")
  // let [password, setPassword] = useState('')
  // let [confirmPassword, setConfirmPassword] = useState('')
  // let [nickname, setNickname] = useState('')
  // let [gen, setGen] = useState('')
  // let [campus, setCampus] = useState('')

  // const onPasswordHandler = (e) => {
  //   setPassword(e.currentTarget.value)
  // }

  // const onConfirmPasswordHandler = (e) => {
  //   setConfirmPassword(e.currentTarget.value)
  //   if (setPassword === setConfirmPassword) {
  //     console.log(setPassword)
  //     console.log(setConfirmPassword)
  //   }
  // }

  // const onNicknameHandler = (e) => {
  //   setNickname(e.currentTarget.value)
  //   axios.get(`http://dev.plover.co.kr/ssafy/account/`, {nickname})
  //   .then(res => {
  //     console.log(res)
  //     if (res.data.response === 'success') {
  //       console.log(nickname)
  //     }
  //   })
  // }
  
  // const onSubmitHandler = (e) => {
  //   e.preventDefault()
  // }