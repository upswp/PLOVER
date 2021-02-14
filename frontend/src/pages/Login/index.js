import React, { useState } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Typo from 'src/components/Typo/Typo';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loginCheck, setLoginCheck] = useState(false);
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Email', email);
    console.log('Password', password);

    axios.post(`https://dev.plover.co.kr/ssafy/account/login`,{
      email,
      password
    }
    ).then(res => {
      console.log(res);
      if (res.data.response === "success") {
      
        //FCM 토큰 코드 추가
        let massage = firebase.messaging();
        massage.getToken().then(token => { 
          axios.post(`https://dev.plover.co.kr/ssafy/notification/registerFCMToken`, token)
          .then(res => { 
            alert(`hello! ${email}`);
          })
          .catch(err => { 
            console.log(err);
          });
        });
       
        //FCM토큰 코드 끝

        setLoginCheck(true);
      } else {
        alert('ID와 PW가 일치하지 않습니다.^0^')
      }
    }).catch(err => {
      console.log(err);
      alert('다시해^0^')
    })
  };

  return (
    <div className={styles.login}>
      {loginCheck && <Redirect to="/study/list" />}
      <h1 className={styles.login__title}>PLOVER</h1>
      <form className={styles.login__form} onSubmit={onSubmitHandler}>
        <input className={styles.login__input} value={email} type="text" placeholder="ID" autoCapitalize="off" onChange={onEmailHandler}/>
        <input className={styles.login__input} value={password} type="password" placeholder="PW" onChange={onPasswordHandler}/>
        <ButtonComp width="login" type="login-option" textvalue="로그인" />
      </form>
    </div>
  );
};

export default Login;