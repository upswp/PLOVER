import React from 'react';
import Imgbox from 'src/components/Imgcomponents/Imgbox';
import Navbar from 'src/components/Navbar/Navbar';
import Navbutton from 'src/components/Navbar/Navbutton';
import Cardslider from 'src/components/Slider/Cardslider';
import user1 from "./testdata/user1.jpg";
// import styles from './index.module.css';

const Home = (props) => {

  return (
    <>
      <Navbar color="white" style={{ marginTop: "20px" }}>
        <Imgbox src={user1} size="small" shape="circle" style={{ marginLeft: "10px" }} />
        <span className="color_black" style={{ marginLeft: "10px", fontWeight: "bold" }}>P_front_developer</span>
        <i className="far fa-bell color_black" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
        <Navbutton color="black" style={{ marginLeft: "10px", marginRight: "10px" }} />
      </Navbar>
      <br/>
      <p>Mentoring 갠찬으시겠어요?</p>
      <br/>
      <div style={{ width: "430px", height: "240px", marginTop: "20px", marginBottom: "10px" }}>
                <Cardslider data={[{
                    img: "/images/mentoring_1.png",
                    badgeColor: "black",
                    badgeValue: "LIVE",
                    url: "/jiyoung",
                    title: "앱 개발 입문",
                    pulseColor: "red"
                }, {
                    img: "/images/mentoring_2.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "웹풀스택과정 강의"
                }, {
                    img: "/images/mentoring_3.png",
                    badgeColor: "blue",
                    badgeValue: "MEET",
                    url: "/jiyoung",
                    title: "코딩의 신이 돼보자!"
                }, {
                    img: "/images/mentoring_4.png",
                    badgeColor: "black",
                    badgeValue: "LIVE",
                    url: "/jiyoung",
                    title: "HELLO WORLD"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }, {
                    img: "/images/mentoring_5.png",
                    badgeColor: "purple",
                    badgeValue: "CHAT",
                    url: "/jiyoung",
                    title: "WEB HACKING"
                }]}
                    history={props.history}
                />
            </div>
            <br/>
            <p>친구추천🙌</p>
            <br/>
            <br/>
            <p>스터디 같이해요😍</p>
            <br/>
    </>
  );
};

export default Home;