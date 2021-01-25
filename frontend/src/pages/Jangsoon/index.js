import React from "react";
import { Skeleton } from "../../components";
import styles from "./index.module.css";

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

        </div>
    )
};

export default Page;