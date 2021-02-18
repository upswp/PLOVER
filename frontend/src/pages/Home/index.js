import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Imgbox from 'src/components/Imgcomponents/Imgbox';
import Navbar from 'src/components/Navbar/Navbar';
import Navbutton from 'src/components/Navbar/Navbutton';
import Cardslider from 'src/components/Slider/Cardslider';
import styles from './index.module.css';
import Menu from 'src/components/Menu/Menu';
import Badgeslider from 'src/components/Slider/Badgeslider';
import Noticeslider from 'src/components/Slider/Noticeslider';
import restapi from 'src/api/restapi';
import StudyList from 'src/components/StudyList/StudyList';
import FadeIn from "react-fade-in";
import Skeleton from 'src/components/Skeleton/Skeleton';
import fire from "src/fire";


const Home = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [recommendedFriendList, setRecommendedFriendList] = useState([]);
  const [studyArticleList, setStudyArticleList] = useState([]);
  const [studyNoticeList, setStudyNoticeList] = useState([]);
  const [showUserData, setShowUserData] = useState({});
  const [mentoringClassList, setMentoringClassList] = useState([]);
  const [notificationPulse, setNotificationPulse] = useState(false);

  const onHandlerLogout = () => {
    localStorage.removeItem('nickname')
    localStorage.removeItem('email')
    localStorage.removeItem('profileImageUrl')
    localStorage.removeItem('accessToken')
    setShowUserData({})
    props.history.replace('/login');
  }

  const renderNavItem = () => {
    return (
      showUserData.accessToken ?
        <>
          <Imgbox src={showUserData.profileImageUrl} size="small" shape="circle" style={{ marginLeft: "0px" }} />
          <FadeIn delay={400}><span className="color_black" style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "0.9rem" }}>hello, {showUserData.nickname}</span></FadeIn>
          <button className={styles.logout__Button} onClick={onHandlerLogout}><i className="fas fa-running" style={{ marginLeft: "auto", marginBottom: "3px" }}></i></button>
        </> :
        <>
          <Skeleton shape="circle" style={{ width: "40px", height: "40px", marginLeft: "5px", marginTop: "5px" }} />
          <FadeIn delay={400}><span className="color_black" style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "0.9rem" }}>hello, Sign In Please ~ :) </span></FadeIn>
        </>
    )
  }

  function addEvent() {
    if (!localStorage.getItem('nickname')) return;

    let nickname = localStorage.getItem('nickname');

    const database = fire.database();
    let notifications = database.ref(`users/${nickname}`);
    notifications.on('value', (list) => {
      const data = list.val();
      let count = 0;
      for (let key in data) {
        count++;
      }

      if (localStorage.getItem('notificationNum') != count) {
        setNotificationPulse(true);
      } else {
        setNotificationPulse(false);
      }
    });
  }


  useEffect(() => {
    // axios.get('https://dev.plover.co.kr/ssafy/user/random')
    restapi.get('/user/random')
      .then((response) => {
        setRecommendedFriendList(response.data.data.users)
      })
      .catch(() => { })

    restapi.get('study/article/최신순/0')
      .then((response) => {
        setStudyArticleList(response.data.data.studies.slice(0, 5))
      })
      .catch(() => { })

    restapi.get('study/notice/0')
      .then((response) => {
        setStudyNoticeList(response.data.data.studies)
      })

    restapi.get('mentoring/list/0')
      .then((response) => {
        console.log(response.data.data.mentoringResponseList)
        setMentoringClassList(response.data.data.mentoringResponseList)
      })

    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');
    const profileImageUrl = localStorage.getItem('profileImageUrl');
    const accessToken = localStorage.getItem('accessToken');

    setShowUserData({ nickname, email, profileImageUrl, accessToken });
    addEvent();
  }, [])

  return (
    <>
      <Navbar color="white" style={{ marginTop: "20px", width: "95%", marginLeft: "auto", marginRight: "auto" }}>
        {renderNavItem()}
        <span style={{ fontSize: "1.8rem", marginLeft: "auto", marginBottom: "3px", cursor: "pointer" }} onClick={() => {
          if (localStorage.getItem('nickname')) props.history.push(`/notification/${localStorage.getItem("nickname")}`);
        }}><i className="far fa-bell color_black"></i></span>
        {notificationPulse === true && <div className={styles.pulse}></div>}
        <Navbutton color={showMenu ? "white" : "black"} style={{ marginLeft: "15px", marginRight: "5px", marginBottom: "3px", zIndex: "999" }} setShowMenu={setShowMenu} showMenu={showMenu} />
      </Navbar>
      { showMenu ? <Menu setShowMenu={setShowMenu} showMenu={showMenu} history={props.history} /> : null}
      <FadeIn delay={300}>
        <h1 className={styles.mentoring__title}>Mentoring 갠찬으시겠어요? 😁😎</h1>
        <div style={{ width: "92%", height: "240px", margin: "20px auto" }}>
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
        <StudyList data={studyArticleList} />
      </FadeIn>
      <br />



    </>
  );
};

export default Home;