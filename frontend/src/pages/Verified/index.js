import React, { useEffect } from 'react'
import { Typo, Navbar } from '../../components'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'

function Verified(props) {

  const history = useHistory()

  useEffect(() => {
    const timer = setTimeout(redirect, 5000)
    return () => {
      clearTimeout(timer)
    }
  })

  const key = document.location.href.split('/')[4]
  console.log(key)

  function GetVerified() {
    if (key === "success") {
      return (
        <div>
          <Typo className={styles.p}>회원가입이 완료되었습니다!</Typo>
          <Typo className={styles.p}>잠시 후 로그인 페이지로 이동합니다.</Typo>
        </div>
      )
    }
    if (key === "fail") {
      return (
        <div>
          <Typo className={styles.p}>이메일 인증에 실패하였습니다.</Typo>
          <Typo className={styles.p}>잠시 후 로그인 페이지로 이동합니다.</Typo>
        </div>
      )
    }
  }

  function redirect() {
    history.push('/login')
  }

  return (
    <div className={styles.container}>
    <Navbar className={styles.nav}>
      <div className={styles.redirect} onClick={() => { history.push("/login") }}></div>
      <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
      <span className={"color_black" + " " + styles.title}><Typo ty="h4">PLOVER</Typo></span>
    </Navbar>
    <GetVerified></GetVerified>
    </div>
  )
}

export default Verified;