import React from "react";
import { Skeleton, Imgbox } from "../../components";
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