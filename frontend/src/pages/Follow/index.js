import React, { useState, useEffect }from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Navbar, Tabs, Typo,
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Input, ImgAttach, Select, ButtonComp, 
//     // , InputTime, InputDate, Navbutton, Input
} from "../../components";
import styles from "./index.module.css";
import axios from 'axios'


const Follow = (props) => {

  const location = useLocation()

  const history = useHistory()

  const requestFollowing = "https://dev.plover.co.kr/ssafy/follow/following/"+location.state.no+"/0"
  const requestFollower = "https://dev.plover.co.kr/ssafy/follow/follower/"+location.state.no+"/0"
  const username = location.state.username
  const push = "/profile/"+location.state.no

  const [followings, setFollowing] = useState([])
  const [followers, setFollower] = useState([])

  useEffect(() => {
    fetchFollow()
  }, [])

  function fetchFollow() {
    axios.get(requestFollowing)
    .then((res) => {
      setFollowing(res.data.data.followUsers)
    })
    .catch((err) => {
    })
    axios.get(requestFollower)
    .then((res) => {
      setFollower(res.data.data.followUsers)
    })
    .catch((err) => {
    })
  }

  const numFollowing =  followings.length + ' 팔로잉'
  const numFollower =  followers.length + ' 팔로워'
  
  function FollowingList() {
    const listItems = followings.map((user, index) =>
    <div className={styles.row} key={"following"+index}>
      <img src={`${process.env.REACT_APP_PUBLIC_HOST}/${user.profileImageUrl}`} shape="circle" className={styles.propic} alt="" />
      <p className={styles.nick}>{user.nickname}</p>
    </div>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  function FollowerList() {
    const listItems = followers.map((user, index) => 
    <div className={styles.row} key={"follower"+index}>
      <img src={`${process.env.REACT_APP_PUBLIC_HOST}/${user.profileImageUrl}`} shape="circle" className={styles.propic} alt=""/>
      <p className={styles.nick}>{user.nickname}</p>
    </div>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
    <div className={styles.head}>
    <Navbar className={styles.nav}>
      <div className={styles.redirect} onClick={() => { history.push(push) }}></div>
      <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
      <span className={"color_black" + " " + styles.title}><Typo ty="h4">{username}</Typo></span>
    </Navbar>
    <Tabs className={styles.tab}>
      <div label={numFollower}>
        <FollowerList></FollowerList>
      </div>
      <div label={numFollowing}>
        <FollowingList></FollowingList>
      </div>
    </Tabs>
    </div>
    </div>
  )
}

export default Follow;