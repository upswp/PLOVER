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

  const request = "https://dev.plover.co.kr/ssafy/follow/following/"+location.state.no+"/0"
  const username = location.state.username
  const push = "/profile/"+location.state.no
  // const request = "https://dev.plover.co.kr/ssafy/follow/following/"+"1"+"/0" // testdata
  // const username = "id" // testdata
  // const push = "/profile/"+"1" // testdata

  const [followings, setFollowing] = useState([])
  const [followers, setFollower] = useState([])

  // const sample = [
  //   {
  //     src: "https://i.pinimg.com/originals/df/10/2b/df102b48062904ebf4af4d118d21fa66.jpg",
  //     username: "텐서플로우",
  //     userNo: 1
  //   },
  //   {
  //     src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-dog-quotes-1580508958.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*",
  //     username: "케라스",
  //     userNo: 2,
  //   },
  //   {
  //     src: "https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg",
  //     username: "파이토치",
  //     userNo: 3,
  //   },
  // ]

  useEffect(() => {
    fetchFollow()
  }, [])

  function fetchFollow() {
    axios.get(request)
    .then((res) => {
      setFollowing(res.data.data.followUsers)
      // console.log(followings)
    })
    .catch((err) => {
      // console.log(err)
    })
    axios.get(request)
    .then((res) => {
      setFollower(res.data.data.followUsers)
      // console.log(followers)
    })
    .catch((err) => {
      // console.log(err)
    })
  }

  const numFollowing =  followings.length + ' 팔로잉'
  const numFollower =  followers.length + ' 팔로워'
  
  function FollowingList() {
    // console.log(followings)
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