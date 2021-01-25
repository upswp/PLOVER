import React from "react";
import { Skeleton, Imgbox, Navbar, Navbutton } from "../../components";
import styles from "./index.module.css";
import bewhy from "./testdata/bewhy.jpg";
import gamst from "./testdata/gamst.png";
import miran from "./testdata/miran.png";
//import restapi from "src/api/restapi";

function Page() {

    return (
        <div className={styles.page}>
            {/* 
                스켈레톤 UI 예제 
                [필수 속성]
                    shape: PropTypes.string.isRequired, //값 : rect,rectRound,circle
                    w: PropTypes.string.isRequired, //width
                    h: PropTypes.string.isRequired, //height
                [기타 속성] 
                    lh: PropTypes.string, //line-height
                    mt: PropTypes.string, //margin-top
                    mb: PropTypes.string, //margin-bottom
                    ml: PropTypes.string, //margin-left
                    mr: PropTypes.string, //margin-right
                    pos: PropTypes.string, //position
                    dp: PropTypes.string //display
            */}
            <div>
                <Skeleton w="400px" h="100px" shape="rectRound" />
                <div style={{ display: "flex", flexDirection: "row", width: "400px", marginTop: "20px" }}>
                    <div style={{
                        width: "60px"
                    }}>
                        <Skeleton w="50px" h="50px" shape="circle" />
                    </div>
                    <div style={{
                        flex: 1
                    }}>
                        <Skeleton w="100%" h="20px" mt="2px" shape="rectRound" />
                        <Skeleton w="100%" h="20px" mt="6px" shape="rectRound" />
                    </div>
                </div>
            </div>
            {/* 
                이미지 박스 예제
                [필수 속성]
                    shape: PropTypes.string.isRequired, //rect circle rectRound
                    w: PropTypes.string.isRequired, //width
                    h: PropTypes.string.isRequired, //height
                [기타 속성] 
                    hover: PropTypes.bool, //hover시 이미지 zoomIn out 여부
                    src: PropTypes.string, //이미지가져오기 없으면 기본 이미지라고 표시
                    lh: PropTypes.string, //line-height
                    mt: PropTypes.string, //margin-top
                    mb: PropTypes.string, //margin-bottom
                    ml: PropTypes.string, //margin-left
                    mr: PropTypes.string, //margin-right
                    pos: PropTypes.string, //position
                    dp: PropTypes.string //display~~
            */}
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Imgbox src={bewhy} mt="20px" w="100px" h="100px" shape="rectRound" hover={true} />
                    <Imgbox src={gamst} ml="20px" mt="20px" w="180px" h="100px" shape="rectRound" hover={true} />
                </div>
                <Imgbox src={miran} mt="20px" w="300px" h="180px" shape="rectRound" hover={true} />
                <Imgbox mt="20px" w="300px" h="180px" shape="rectRound" hover={true} />
            </div>
            {
                /*
                    네비바 예제
                */
            }
            <div>
                <Navbar pos="relative" mt="20px" w="100%" h="50px" bg="purple">
                    <Imgbox src={bewhy} w="40px" h="40px" shape="circle" ml="10px" hover={true} />
                    <span style={{ marginLeft: "10px", fontSize: "0.9em", fontWeight: "bold", color: "white" }}>bewhy_offcial</span>
                    <i className="far fa-bell" style={{ fontSize: "1.8em", marginLeft: "auto", color: "white" }}></i>
                    <Navbutton color="white" mr="10px" ml="20px" />
                </Navbar>
                <Navbar pos="relative" mt="20px" w="100%" h="50px" bg="white">
                    <Imgbox src={bewhy} w="40px" h="40px" shape="circle" ml="10px" hover={true} />
                    <span style={{ marginLeft: "10px", fontSize: "0.9em", fontWeight: "bold" }}>bewhy_offcial</span>
                    <i className="far fa-bell" style={{ fontSize: "1.8em", marginLeft: "auto" }}></i>
                    <Navbutton color="black" mr="10px" ml="20px" />
                </Navbar>
                <Navbar pos="relative" mt="20px" w="100%" h="50px" bg="#3A76FF">
                    <Imgbox src={bewhy} w="40px" h="40px" shape="circle" ml="10px" hover={true} />
                    <span style={{ marginLeft: "10px", fontSize: "0.9em", fontWeight: "bold", color: "white" }}>bewhy_offcial</span>
                    <i className="far fa-bell" style={{ fontSize: "1.8em", marginLeft: "auto", color: "white" }}></i>
                    <Navbutton color="white" mr="10px" ml="20px" F={() => {
                        console.log('버튼클릭 !')
                    }} />
                </Navbar>
                <Navbar pos="relative" mt="20px" w="100%" h="50px" bg="red">
                    <Imgbox src={bewhy} w="40px" h="40px" shape="circle" ml="10px" hover={true} />
                    <span style={{ marginLeft: "10px", fontSize: "0.9em", fontWeight: "bold", color: "white" }}>bewhy_offcial</span>
                    <i className="far fa-bell" style={{ fontSize: "1.8em", marginLeft: "auto", color: "white" }}></i>
                    <Navbutton color="white" mr="10px" ml="20px" F={() => {
                        console.log('버튼클릭 !')
                    }} />
                </Navbar>
                <Navbar pos="relative" mt="20px" w="100%" h="50px" bg="white">
                    <i className="fas fa-arrow-left" style={{ fontSize: "1.8em", marginLeft: "10px", color: "black" }}></i>
                    <span style={{ marginLeft: "auto", marginRight: "auto", fontSize: "1.2em", fontWeight: "bold" }}>회원가입</span>
                    <i className="fas fa-arrow-left" style={{ fontSize: "1.8em", marginRight: "10px", color: "white" }}></i>
                </Navbar>
                <Navbar pos="relative" mt="20px" w="100%" h="50px" bg="#3A76FF">
                    <i className="fas fa-arrow-left" style={{ fontSize: "1.8em", marginLeft: "10px", color: "white" }}></i>
                    <span style={{ marginLeft: "auto", marginRight: "auto", fontSize: "1.2em", fontWeight: "bold", color: "white" }}>로그인</span>
                    <i className="fas fa-arrow-left" style={{ fontSize: "1.8em", marginRight: "10px", color: "#3A76FF" }}></i>
                </Navbar>
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