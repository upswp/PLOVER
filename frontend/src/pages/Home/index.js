import React, { useState } from 'react';
import Imgbox from 'src/components/Imgcomponents/Imgbox';
import Navbar from 'src/components/Navbar/Navbar';
import Navbutton from 'src/components/Navbar/Navbutton';
import Cardslider from 'src/components/Slider/Cardslider';
import user1 from "./testdata/user1.jpg";
import styles from './index.module.css';
import Menu from 'src/components/Menu/Menu';
import Badgeslider from 'src/components/Slider/Badgeslider';
import Noticeslider from 'src/components/Slider/Noticeslider';
// import restapi from 'src/api/restapi';
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

const friendRecommendSlider = [{
  img: "/images/bewhy.jpg",
  nickname: "1기 비와이",
  ordnum: "1",
}, 
{
  img: "/images/gangsora.png",
  nickname: "2기 강소라",
  ordnum: "2",
}, 
{
  img: "/images/one.png",
  nickname: "3기 원빈",
  ordnum: "3",
}, 
{
  img: "/images/swings.png",
  nickname: "4기 스윙스",
  ordnum: "4",
}, 
{
  img: "/images/yeji.png",
  nickname: "5기 예지",
  ordnum: "5",
}, 
{
  img: "/images/park.png",
  nickname: "1기 박명수",
  ordnum: "1",
}, 
{
  img: "/images/bewhy.jpg",
  nickname: "sadasddddddddddddddddddddddddddd",
  ordnum: "2",
}, 
{
  img: "/images/bewhy.jpg",
  nickname: "가나다라마바사아자차카타파하",
  ordnum: "3",
}, 
{
  img: "/images/bewhy.jpg",
  nickname: "sadas",
  ordnum: "4",
}, 
{
  img: "/images/bewhy.jpg",
  nickname: "sadas",
  ordnum: "5",
}, 
{
  img: "/images/bewhy.jpg",
  nickname: "sadas",
  ordnum: "1",
}, 
{
  img: "/images/bewhy.jpg",
  nickname: "sadas",
  ordnum: "1",
}]

const studyNoticeList = [
  {
    gubun: "공지",
    title: "공지사항1 입니다.",
    time: "5분전",
    url: "/jiyoung"
  }, {
    gubun: "공지",
    title: "공지사항2 입니다.",
    time: "10분전",
    url: "/jiyoung"
  }, {
    gubun: "공지",
    title: "공지사항3 입니다.",
    time: "15분전",
    url: "/jiyoung"
  }, {
    gubun: "공지",
    title: "공지사항4 입니다.",
    time: "20분전",
    url: "/jiyoung"
  }]

const studyArticleList = [
  {
    "id": 1,
    "title": "대전/CS/스터디 팀원 충원합니다!",
    "hashtags": [
      {
        "id": 1,
        "name": "디비"
      }
    ],
    "date": "하루전",
    "user": {
      "profileImg": "https://picsum.photos/200/200",
      "userId": "tory_922"
    }
  },
  {
    "id": 2,
    "title": "리액트 스터디원 모집!",
    "hashtags": [
      {
        "id": 1,
        "name": "디비"
      }
    ],
    "date": "17시간전",
    "user": {
      "profileImg": "https://picsum.photos/200/200",
      "userId": "jang_su"
    }
  },
  {
    "id": 3,
    "title": "vanilla JS 스터디 모집합니다.",
    "hashtags": [
      {
        "id": 1,
        "name": "디비"
      }
    ],
    "date": "12시간전",
    "user": {
      "profileImg": "https://picsum.photos/200/200",
      "userId": "jiyoung321"
    }
  }
]

const Home = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <>
      <Navbar color="white" style={{ marginTop: "20px" }}>
        <Imgbox src={user1} size="small" shape="circle" style={{ marginLeft: "15px" }} />
        <span className="color_black" style={{ marginLeft: "15px", fontWeight: "bold", fontSize:"0.9rem"}}>hello, jiyoung_321</span>
        <i className="far fa-bell color_black" style={{ fontSize: "1.8rem", marginLeft: "auto", marginBottom: "3px" }}></i>
        <Navbutton color="black" style={{ marginLeft: "15px", marginRight: "5px", marginBottom: "3px"}} setShowMenu={setShowMenu} showMenu={showMenu} />
      </Navbar>
      { showMenu ? <Menu setShowMenu={setShowMenu} showMenu={showMenu} /> : null }
      <h1 className={styles.mentoring_title}>Mentoring 갠찬으시겠어요? 😁😎</h1>
      <div style={{ width: "430px", height: "240px", marginTop: "20px", marginBottom: "10px", marginLeft: "15px" }}>
        <Cardslider data={mentoringClassList}
          history={props.history}
        />
      </div>
      <h1 className={styles.friend_reco_title}>친구추천🙌</h1>
      <div style={{ width: "430px", height: "200px", marginTop: "20px", marginBottom: "30px", marginLeft: "5px" }}>
        <Badgeslider
          perCount={6}
          card={{
            width: "130px",
            height: "80px",
          }}
          data={friendRecommendSlider} history={props.history} />
      </div>
      <h1 className={styles.study_title}>스터디 같이해요😍</h1>
      <div style={{ width: "400px", height: "40px", marginBottom: "10px", marginLeft: "15px" }}>
        <Noticeslider data={studyNoticeList} style={{ height: "40px" }} duration={3000} history={props.history} />
      </div>
      <StudyList data={studyArticleList}/>

      
    </>
  );
};

export default Home;