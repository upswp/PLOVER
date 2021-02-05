import React, { useState } from "react";
import axios from "axios";
import {
  Input, ImgAttach, Select, ButtonComp, Typo
//     // Skeleton, Navbar, Navbutton, Imgbox, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Tabs
//     // , InputTime, InputDate
} from "../../components";
import styles from "./index.module.css";

function Register(props) {
  
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')
  let [nickname, setNickname] = useState('')
  let [gen, setGen] = useState('')
  let [campus, setCampus] = useState('')

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
    if (setPassword === setConfirmPassword) {
      console.log(setPassword)
      console.log(setConfirmPassword)
    }
  }

  const onNicknameHandler = (e) => {
    axios.get(`http://dev.plover.co.kr/ssafy/account/`, {nickname})
    .then(res => {
      console.log(res)
      if (res.data.response === 'success') {
        console.log(nickname)
      }
    })
  }
  
  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
        <div className={styles.container}>
          <div className={styles.head}>
          <div className={styles.header}></div>
          <ImgAttach className={styles.propic}></ImgAttach>
          </div>
    
          <div className={styles.inputdiv}>
          <Typo ty="desc" className={styles.label}>아이디</Typo>
          <Input type="email" placeholder="이메일을 입력하세요"></Input>
    
          <Typo ty="desc" className={styles.label}>패스워드</Typo>
          <Input type="password" placeholder="패스워드를 입력하세요"></Input>
    
          <Typo ty="desc" className={styles.label}>패스워드 확인</Typo>
          <Input type="password" placeholder="패스워드 확인"></Input>
          <Typo ty="desc" className={styles.label} onChange={onNicknameHandler}>닉네임</Typo>
          <Input placeholder="닉네임을 입력하세요"></Input>
    
          <Typo ty="desc" className={styles.label}>기수</Typo>
          <Select>
            <option value="">기수를 선택하세요</option>
            <option value="1기">1기</option>
            <option value="2기">2기</option>
            <option value="3기">3기</option>
            <option value="4기">4기</option>
            <option value="5기">5기</option>
          </Select>
          <Typo ty="desc" className={styles.label}>캠퍼스 선택</Typo>
          <Select>
            <option value="">지역을 선택하세요</option>
            <option value="서울 캠퍼스">서울 캠퍼스</option>
            <option value="대전 캠퍼스">대전 캠퍼스</option>
            <option value="광주 캠퍼스">광주 캠퍼스</option>
            <option value="구미 캠퍼스">구미 캠퍼스</option>
          </Select>
    
          <ButtonComp className={styles.button} width="large" type="base" textvalue="회원가입"></ButtonComp>
          </div>
        </div>
  )
};
export default Register;