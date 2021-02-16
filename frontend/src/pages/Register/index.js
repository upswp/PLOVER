import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import {
  Input, ImgAttach, Select, ButtonComp, Typo, Navbar,
} from "../../components";
import styles from "./index.module.css";
import axios from 'axios'

function Register(props) {

  const history = useHistory()

  const [img, setImg] = useState(null)
  const [imgUrl, setImgUrl] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [generation, setGeneration] = useState('')
  const [campus, setCampus] = useState('')
  const [description, setDescription] = useState('')
  const [eChecked, setEChecked] = useState(false)
  const [nChecked, setNChecked] = useState(false)

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPassHandler = (event) => {
    if (event.target.id === "password") {
      setPassword(event.currentTarget.value)
    }
    if (event.target.id === "passwordConfirm") {
      setPassConfirm(event.currentTarget.value)
    }
  };
  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onGenerationHandler = (event) => {
    setGeneration(event.currentTarget.value);
  };
  const onCampusHandler = (event) => {
    setCampus(event.currentTarget.value);
  };
  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  
  const handleChangeFile = (event) => {
    console.log(event.target.files[0])
    setImg(event.target.files[0])
    const reader = new FileReader()
    reader.onloadend = () => {
      setImgUrl(reader.result.toString())
      console.log(imgUrl)
    }
    // reader.readAsDataURL(img)
    console.log(img)
    console.log(imgUrl)
  }
  const handleRemove = () => {
    setImg(null)
  };

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

  const dupEmail = () => {
    if (email <= 0) {
      console.log('default')
      return
    }
    axios.get("https://dev.plover.co.kr/ssafy/account/checkDupEmail",{
      params: {
        email: email
    }})
    .then((res) => {
      if (res.status === 200) {
        console.log(email)
        console.log(res)
        if (res.data.response === "success") {
          alert('이메일을 사용할 수 있습니다.')
          const disableEmail = document.getElementById('email')
          const disableEmailButton = document.getElementById('dupEmail')
          disableEmail.disabled='true'
          disableEmailButton.disabled='true'
          setEChecked(true)
        }
        else {
          alert('중복된 이메일입니다.')
        }
      }
    })
  }

  const validEmail = (str) => {
    console.log(str)
    let valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (valid.test(str)) {
      dupEmail()
    }
    else {
      console.log(str)
      alert('이메일 형식이 아닙니다.')
      return
    }
  }

  const dupNickname = () => {
    console.log('asdf')
    if (nickname <= 0) {
      console.log('default')
      return
    }
    axios.get("https://dev.plover.co.kr/ssafy/account/checkDupNickName",{
      params: {
        nickName: nickname
    }})
    .then((res) => {
      if (res.status === 200) {
        console.log(nickname)
        console.log(res)
        if (res.data.response === "success") {
          alert('닉네임을 사용할 수 있습니다.')
          const disableNick = document.getElementById('nickname')
          const disableNickButton = document.getElementById('dupNickname')
          disableNick.disabled='true'
          disableNickButton.disabled='true'
          setNChecked(true)
        }
        else {
          alert('중복된 닉네임입니다.')
        }
      }
    })
  }
  async function register() {
    // console.log(this.$propic.value)
    // if (this.$propic.value === undefined) {
    //   this.$propic.value='/images/default-image.png'
    // }
    // console.log(this.$propic.value)
    if (!email || !password || !passConfirm || !nickname ||
      !generation || !campus || !description === true) {
        alert('모든 입력값을 채워주세요.')
        return
      }
    if (eChecked === false) {
      alert('이메일 중복 확인을 해 주세요.')
      return
    }
    if (nChecked === false) {
      alert('닉네임 중복 확인을 해 주세요.')
      return
    }
    if (password != passConfirm) {
      alert('비밀번호 확인이 일치하지 않습니다.')
      return
    }
    console.log('register')

    const formData = new FormData()
    const userData = {
      email: email,
      password: password,
      nickname: nickname,
      generation: generation,
      campus: campus,
      description: description,
    }
    console.log(img)
    console.log(userData)
    formData.append('file', img)
    formData.append('user', new Blob([JSON.stringify(userData)], {type: 'application/json'}))
    // 이전 async 실행이 완료되길 기다렸다가 await 실행
    await axios.post("https://dev.plover.co.kr/ssafy/account/signup", {
      formData
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(res)
        history.push({
          pathname: '/verify',
          state: {email: email}
        })
      }
      else {
        console.log(res)
        alert('실패')
      }
    })
    .catch((err) => {
      console.log(err)
      alert('실패')
    })
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

      <div className={styles.relative}>
        <div className={styles.header}>
          <div className={styles.box}>
            <input id="propic" type="file" name="Inputfile" onChange={handleChangeFile} className={styles.input}/>
            <img src={img ? img : "/images/default-image.png"} onClick={handleRemove} alt="" className={styles.profile}/>
            <label className={styles.attach_icon}>
            <i className="fas fa-camera-retro color_black" style={{ fontSize: "1.0m", height: "100%" }}></i>
            </label>
          </div>
        </div>
      </div>
    </div>

      <div className={styles.inputdiv}>
      <Typo className={styles.label} ty="desc">이메일</Typo>
      <div className={styles.div}>
      <Input className={styles.dupinput} id="email" type="email" placeholder="이메일을 입력하세요" onchange={onEmailHandler}></Input>
      <ButtonComp className={styles.dup} width="regular" type="base" textvalue="중복확인" id="dupEmail" onClick={() => {validEmail(email)}}></ButtonComp>
      </div>

      <Typo ty="desc" className={styles.label}>패스워드</Typo>
      <Input id="password" type="password" placeholder="패스워드를 입력하세요" onchange={onPassHandler}></Input>

      <Typo ty="desc" className={styles.label}>패스워드 확인</Typo>
      <Input id="passwordConfirm" type="password" placeholder="패스워드 확인" onchange={onPassHandler}></Input>
      <PassConfirm></PassConfirm>

      <Typo ty="desc" className={styles.label}>닉네임</Typo>
      <div className={styles.div}>
      <Input className={styles.dupinput} id="nickname" placeholder="닉네임을 입력하세요" onchange={onNicknameHandler}></Input>
      <ButtonComp className={styles.dup} width="regular" type="base" textvalue="중복확인" id="dupNickname" onClick={dupNickname}></ButtonComp>
      </div>

      <Typo ty="desc" className={styles.label}>기수</Typo>
      <Select id="generation" onchange={onGenerationHandler}>
        <option value="">기수를 선택하세요</option>
        <option value="1기">1기</option>
        <option value="2기">2기</option>
        <option value="3기">3기</option>
        <option value="4기">4기</option>
        <option value="5기">5기</option>
      </Select>

      <Typo ty="desc" className={styles.label}>캠퍼스 선택</Typo>
      <Select id="campus" onchange={onCampusHandler}>
        <option value="">지역을 선택하세요</option>
        <option value="서울 캠퍼스">서울 캠퍼스</option>
        <option value="대전 캠퍼스">대전 캠퍼스</option>
        <option value="광주 캠퍼스">광주 캠퍼스</option>
        <option value="구미 캠퍼스">구미 캠퍼스</option>
      </Select>

      <Typo ty="desc" className={styles.label}>한줄소개</Typo>
      <Input id="description" height="tall" placeholder="한줄소개를 작성해주세요" onchange={onDescriptionHandler}></Input>

      <ButtonComp id="register" className={styles.button} width="large" type="base" textvalue="회원가입" onClick={register}></ButtonComp>
      </div>
    </div>
  )
};
export default Register;