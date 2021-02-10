import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Tabs, Typo
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Input, ImgAttach, Select, ButtonComp, 
//     // , InputTime, InputDate, Navbutton, Input
} from "../../components";
import styles from "./index.module.css";
import axios from 'axios'


const Follow = (props) => {

  const history = useHistory()

  const getFollowing = () => {
    axios.get('https://dev.plover.co.kr/ssafy/follow/following/0')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getFollower = () => {
    axios.get('https://dev.plover.co.kr/ssafy/follow/follower/0')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className={styles.container}>
    <div className={styles.head}>
    <Navbar className={styles.nav}>
      <div className={styles.redirect} onClick={() => { history.push("/home") }}></div>
      <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
      <span className={"color_black" + " " + styles.title}><Typo ty="h4">id</Typo></span>
      {/* <i className={"fas fa-search"}></i> */}
    </Navbar>
    <Tabs className={styles.tab}>
      <div label="팔로잉">
      <p>TAB 1 contents</p>
      </div>
      <div label="팔로워">
      <p>TAB 2 contents</p>
      </div>
    </Tabs>
    </div>
    <button onClick={ getFollower, getFollowing }>불러오기</button>
    </div>
  )
}

export default Follow;