import React from "react";
import { Skeleton, Navbar, Navbutton, Imgbox, Cardslider } from "../../components";
import styles from "./index.module.css";
import bewhy from "./testdata/bewhy.jpg";
import gamst from "./testdata/gamst.png";
import miran from "./testdata/miran.png";
//import restapi from "src/api/restapi";

function Page(props) {

    return (
        <div className={styles.page}>
            {/* 
                스켈레톤 UI 예제 
                [필수 속성]
                    shape: PropTypes.string.isRequired, //값 : rect,rectRound,circle
                    size: PropTypes.string //mini tiny small mid large big , auto(100%)
            */}
            <div>
                <Skeleton size="mid" shape="rectRound" />
                <div style={{ display: "flex", flexDirection: "row", width: "400px", marginTop: "20px" }}>
                    <div style={{
                        width: "60px",
                        height: "60px"
                    }}>
                        <Skeleton size="auto" shape="circle" />
                    </div>
                    <div style={{
                        flex: 1
                    }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div><Skeleton shape="rectRound" style={{ width: "100%", height: "20px", marginLeft: "5px", marginTop: "5px" }} /></div>
                            <div><Skeleton shape="rectRound" className={styles.power} style={{ width: "100%", height: "20px", marginLeft: "5px", marginTop: "5px" }} /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/*
                    Imgbox 컴포넌트 예제
            */}
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Imgbox src={bewhy} size="mid" shape="circle" style={{ marginTop: "20px" }} />
                    <Imgbox src={gamst} shape="rectRound" style={{ width: "180px", height: "100px", marginLeft: "20px", marginTop: "20px" }} />
                </div>
                <Imgbox src={miran} shape="rectRound" style={{ width: "300px", height: "180px", marginTop: "20px" }} />
            </div>

            {
                /*
                    Navbar 컴포넌트 예제
                */
            }
            <div>
                <Navbar color="purple" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" w="40px" h="40px" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_white" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_white" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="white" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
                <Navbar color="white" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" w="40px" h="40px" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_black" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_black" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="black" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
                <Navbar color="blue" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" w="40px" h="40px" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_white" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_white" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="white" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
                <Navbar color="red" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" w="40px" h="40px" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_white" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_white" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="white" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
            </div>
            {
                /*
                    CardSlider 컴포넌트 예제
                    box: PropTypes.object,//박스사이즈
                    card: PropTypes.object,//카드사이즈
                    data: PropTypes.array.isRequired,//데이터
                    isAuto: PropTypes.bool, //자동슬라이드 여부
                */

                /* 
                    data 정의하기
                    img : 이미지경로
                    badgeColor
                    badgeValue
                    url : 링크
                */
            }
            <div style={{ width: "430px", height: "300px", marginTop: "20px", marginBottom: "150px" }}>
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
        </div>
    )
};

export default Page;

/*
    REST API 테스트코드
    useEffect(async () => {
        console.log("==axios signup 테스트 진행==");
        //axios 테스트
        await restapi.post("/account/signup", {
            "city": "대전",
            "email": "limjangsoon@naver.com",
            "gender": "남자",
            "nickName": "임장순",
            "password": "ssafychain1!"
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });

        console.log("==fetch login 테스트 진행==");
        //fetch 테스트
        await restapi.post("/account/login?email=limjangsoon@naver.com&password=ssafychain1!").then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    */