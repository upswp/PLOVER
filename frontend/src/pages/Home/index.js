import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Imgbox from 'src/components/Imgcomponents/Imgbox';
import Navbar from 'src/components/Navbar/Navbar';
import Navbutton from 'src/components/Navbar/Navbutton';
import Cardslider from 'src/components/Slider/Cardslider';
import user1 from "./testdata/user1.jpg";
import styles from './index.module.css';
import Menu from 'src/components/Menu/Menu';
import Badgeslider from 'src/components/Slider/Badgeslider';
import Noticeslider from 'src/components/Slider/Noticeslider';
import restapi from 'src/api/restapi';
import StudyList from 'src/components/StudyList/StudyList';

const mentoringClassList = [
  {
    img: "/images/mentoring_1.png",
    badgeColor: "black",
    badgeValue: "LIVE",
    url: "/jiyoung",
    title: "앱 개발 입문",
    pulseColor: "red"
  }, 
  {
    img: "/images/mentoring_2.png",
    badgeColor: "purple",
    badgeValue: "CHAT",
    url: "/jiyoung",
    title: "웹풀스택과정 강의"
  }, 
  {
    img: "/images/mentoring_3.png",
    badgeColor: "blue",
    badgeValue: "MEET",
    url: "/jiyoung",
    title: "코딩의 신이 돼보자!"
  }, 
  {
    img: "/images/mentoring_4.png",
    badgeColor: "black",
    badgeValue: "LIVE",
    url: "/jiyoung",
    title: "HELLO WORLD"
  }, 
  {
    img: "/images/mentoring_5.png",
    badgeColor: "purple",
    badgeValue: "CHAT",
    url: "/jiyoung",
    title: "WEB HACKING"
  }, 
  {
    img: "/images/mentoring_5.png",
    badgeColor: "purple",
    badgeValue: "CHAT",
    url: "/jiyoung",
    title: "WEB HACKING"
  }
]

const Home = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [recommendedFriendList, setRecommendedFriendList] = useState([]);
  const [studyArticleList, setStudyArticleList] = useState([]);
  const [studyNoticeList, setStudyNoticeList] = useState([]); 
  const [showUserData, setShowUserData] = useState({});

  useEffect(() => {
    // axios.get('https://dev.plover.co.kr/ssafy/user/random')
    restapi.get('/user/random')
    .then((response) => {
      setRecommendedFriendList(response.data.data.users)
    })
    .catch(() => {})
    
    restapi.get('study/article/최신순/0')
    .then((response) => {
      setStudyArticleList(response.data.data.studies.slice(0, 5))
    })
    .catch(() => {})

    restapi.get('study/notice/0')
    .then((response) => {
      setStudyNoticeList(response.data.data.studies)
    })

    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');
    
    setShowUserData({nickname, email});
  }, [])

  return (
    <>
      <Navbar color="white" style={{ marginTop: "20px", width: "95%", marginLeft: "auto", marginRight: "auto"}}>
        <Imgbox src={user1} size="small" shape="circle" style={{ marginLeft: "0px" }} />
        <span className="color_black" style={{ marginLeft: "15px", fontWeight: "bold", fontSize:"0.9rem"}}>hello, {showUserData.nickname}</span>
        <i className="far fa-bell color_black" style={{ fontSize: "1.8rem", marginLeft: "auto", marginBottom: "3px" }}></i>
        <Navbutton color="black" style={{ marginLeft: "15px", marginRight: "5px", marginBottom: "3px"}} setShowMenu={setShowMenu} showMenu={showMenu} />
      </Navbar>
      { showMenu ? <Menu setShowMenu={setShowMenu} showMenu={showMenu} /> : null }
      <h1 className={styles.mentoring__title}>Mentoring 갠찬으시겠어요? 😁😎</h1>
      <div style={{ width: "100%", height: "240px", marginTop: "20px", marginBottom: "10px", marginLeft: "1em" }}>
        <Cardslider data={mentoringClassList}
          history={props.history}
        />
      </div>
      <h1 className={styles.friend__reco__title}>친구추천🙌</h1>
      <div style={{ width: "100%", height: "200px", marginBottom: "45px", padding: "0.5em" }}>
        <Badgeslider
          perCount={6}
          card={{
            width: "6.5em",
            height: "80px",
          }}
          data={recommendedFriendList} history={props.history} />
      </div>

      <h1 className={styles.study__title}>스터디 같이해요😍</h1>
      <div style={{ height: "40px", marginBottom: "10px", marginLeft: "0.8em", marginRight: "0.8em" }}>
        <Noticeslider data={studyNoticeList} style={{ height: "40px" }} duration={3000} history={props.history} />
      </div>
      <StudyList data={studyArticleList}/>
      <br />
      

      
    </>
  );
};

export default Home;