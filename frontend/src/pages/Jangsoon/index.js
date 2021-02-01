import React from "react";
import {
    Skeleton, Navbar, Navbutton, Imgbox, Cardslider, Badgeslider, Noticeslider, PulseBadge
    , Badge, ButtonComp, Tabs
    , Select, InputTime, InputDate, Input, Typo, ImgAttach
} from "../../components";
import styles from "./index.module.css";
import bewhy from "./testdata/bewhy.jpg";
import gamst from "./testdata/gamst.png";
import miran from "./testdata/miran.png";
//import restapi from "src/api/restapi";

function Page(props) {

    return (
        <div className={styles.page}>
            {/* 
                스켈레톤 UI 예제 !
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
                    <Imgbox src={bewhy} size="small" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_white" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_white" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="white" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
                <Navbar color="white" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_black" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_black" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="black" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
                <Navbar color="blue" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" shape="circle" style={{ marginLeft: "10px" }} />
                    <span className="color_white" style={{ marginLeft: "10px", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell color_white" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="white" style={{ marginLeft: "10px", marginRight: "10px" }} />
                </Navbar>
                <Navbar color="red" style={{ marginTop: "20px" }}>
                    <Imgbox src={bewhy} size="small" shape="circle" style={{ marginLeft: "10px" }} />
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

            {/*
                뱃지 슬라이더 예제
            */}
            <div style={{ width: "430px", height: "200px", marginTop: "20px", marginBottom: "30px" }}>
                <Badgeslider
                    perCount={6}
                    card={{
                        width: "130px",
                        height: "80px",
                    }}
                    data={[{
                        img: "/images/bewhy.jpg",
                        nickname: "1기 비와이",
                        ordnum: "1",
                    }, {
                        img: "/images/gangsora.png",
                        nickname: "2기 강소라",
                        ordnum: "2",
                    }, {
                        img: "/images/one.png",
                        nickname: "3기 원빈",
                        ordnum: "3",
                    }, {
                        img: "/images/swings.png",
                        nickname: "4기 스윙스",
                        ordnum: "4",
                    }, {
                        img: "/images/yeji.png",
                        nickname: "5기 예지",
                        ordnum: "5",
                    }, {
                        img: "/images/park.png",
                        nickname: "1기 박명수",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadasddddddddddddddddddddddddddd",
                        ordnum: "2",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "가나다라마바사아자차카타파하",
                        ordnum: "3",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "4",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "5",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }, {
                        img: "/images/bewhy.jpg",
                        nickname: "sadas",
                        ordnum: "1",
                    }]} history={props.history} />
            </div>

            {/*
                공지 슬라이더 예제
            */}
            <div style={{ width: "430px", height: "40px", marginBottom: "10px" }}>
                <Noticeslider data={[{
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
                }]} style={{ height: "40px" }} duration={1000} history={props.history} />
            </div>
            <div style={{ width: "430px", height: "40px", marginBottom: "10px" }}>
                <Noticeslider data={[{
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
                }]} style={{ height: "40px" }} duration={3000} history={props.history} />
            </div>
            {
                /*
                    pulse 뱃지 예제
                */
            }
            <div style={{ position: "relative", width: "430px", height: "40px", marginTop: "100px", marginBottom: "100px", display: "flex", flexDirection: "row" }}>
                <PulseBadge title="LIVE" bg="black" style={{ position: "relative" }} />
                <PulseBadge title="MEET" bg="purple" style={{ position: "relative" }} />
                <PulseBadge title="CHAT" bg="blue" style={{ position: "relative" }} />
            </div>

            <p>fontawesome_test</p>
            <button><i className="fas fa-play-circle"></i></button>
            <button><i className="fas fa-bars"></i></button>
            <br />
            <br />
            <ButtonComp width="small" type="base" value="버튼s" />
            <br />
            <ButtonComp width="regular" type="base" value="버튼r" />
            <br />
            <ButtonComp width="large" type="base" value="버튼l" />
            <br />
            <ButtonComp width="login" type="login-option" value="로그인" />
            <br />
            <br />
            <Badge ordnum="first" value="1" />
            <Badge ordnum="second" value="2" />
            <Badge ordnum="third" value="3" />
            <Badge ordnum="fourth" value="4" />
            <Badge ordnum="fifth" value="5" />
            <br />
            <br />
            <br />
            <Tabs>
                <div label="20k 팔로워">
                    <p>팔로워~~~~~~~~~~~</p>
                </div>
                <div label="23 팔로잉">
                    <p>팔로잉!!!!!!!!!!!!!!!!!!!</p>
                </div>
            </Tabs>
            <br />
            <br />
            <br />
            <Tabs>
                <div label="Tab 1">
                    <p>TAB 1 contents!!!!!!!!!!!!!!!!!!!</p>
                </div>
                <div label="Tab 2">
                    <p>TAB 2 contents!!!!!!!!!!!!!!!!!!!</p>
                </div>
                <div label="Tab 3">
                    <p>TAB 3 contents!!!!!!!!!!!!!!!!!!!</p>
                </div>
            </Tabs>

            <p>Input</p><Input height="tall" placeholder="tall inputbox"></Input><br />
            <p>InputDate</p><InputDate width="short" placeholder="short inputbox"></InputDate><br />
            <p>InputTime</p><InputTime></InputTime><br />

            <p>Select, Option</p>
            <Select
                option="1/2/3" default="default"></Select>

            <Typo ty="h1" value="h1"></Typo>
            <Typo ty="h2" value="h2"></Typo>
            <Typo ty="h3" value="h3"></Typo>
            <Typo ty="h4" value="h4"></Typo>
            <Typo ty="p" value="default"></Typo>
            <Typo ty="desc" value="desc"></Typo>

            <ImgAttach></ImgAttach><br/><br/><br/><br/><br/><br/>
            <ImgAttach type="mentoring"></ImgAttach>
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
