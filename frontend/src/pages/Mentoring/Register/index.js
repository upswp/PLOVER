import React from 'react';
import { Navbar, Typo, ImgAttach, Input, Select, InputDate, InputTime, ButtonComp } from "src/components";

function Register(props) {
    return (
        <>
            <Navbar color="white">
                <i className="fas fa-chevron-left color_black" style={{ fontSize: "1.1em", marginLeft: "10px" }}></i>
                <span className="color_black" style={{ margin: "0 auto", fontWeight: "bold" }}><Typo ty="h4">회원가입</Typo></span>
                <i className="fas fa-chevron-left color_white" style={{ fontSize: "1.1em", marginRight: "10px" }}></i>
            </Navbar>
            <div style={{ width: "100%", padding: "10px", height: "200px" }}>
                <ImgAttach type="mentoring" style={{ width: "100%", height: "100%" }}></ImgAttach>
            </div>
            <div style={{ marginTop: "10px", width: "100%", padding: "0px 10px", height: "30px", lineHeight: "30px" }}>
                <Typo ty="p">제목</Typo>
            </div>
            <div style={{ marginTop: "2px", width: "100%", padding: "0px 10px", height: "40px", lineHeight: "30px" }}>
                <Input placeholder="제목을 입력해주세요." type="text" style={{ width: "100%", height: "100%" }} />
            </div>
            <div style={{ marginTop: "20px", width: "100%", padding: "0px 10px", height: "30px", lineHeight: "30px" }}>
                <Typo ty="p">유형</Typo>
            </div>
            <div style={{ marginTop: "2px", width: "100%", padding: "0px 10px", height: "40px", lineHeight: "30px" }}>
                <Select style={{ width: "100%", height: "100%" }}>
                    <option value="test1">유형을 선택해주세요.</option>
                    <option value="test1">실시간 라이브</option>
                    <option value="test1">채팅</option>
                    <option value="test1">스터디 모임</option>
                </Select>
            </div>
            <div style={{ marginTop: "20px", width: "100%", padding: "0px 10px", height: "30px", lineHeight: "30px" }}>
                <Typo ty="p">시작 날짜/시간</Typo>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: "2px", width: "100%", padding: "0px 10px", height: "40px", lineHeight: "30px" }}>
                <div style={{ width: "49%" }}>
                    <InputDate style={{ width: "100%", height: "100%" }}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputDate>
                </div>
                <div style={{ width: "49%" }}>
                    <InputTime style={{ width: "100%", height: "100%" }}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputTime>
                </div>
            </div>
            <div style={{ marginTop: "20px", width: "100%", padding: "0px 10px", height: "30px", lineHeight: "30px" }}>
                <Typo ty="p">종료 날짜/시간</Typo>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: "2px", width: "100%", padding: "0px 10px", height: "40px", lineHeight: "30px" }}>
                <div style={{ width: "49%" }}>
                    <InputDate style={{ width: "100%", height: "100%" }}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputDate>
                </div>
                <div style={{ width: "49%" }}>
                    <InputTime style={{ width: "100%", height: "100%" }}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputTime>
                </div>
            </div>
            <div style={{ marginTop: "20px", width: "100%", padding: "0px 10px", height: "30px", lineHeight: "30px" }}>
                <Typo ty="p">내용</Typo>
            </div>
            <div style={{ marginTop: "2px", width: "100%", padding: "0px 10px", height: "200px" }}>
                <textarea placeholder="내용을 입력해주세요." type="text" style={{ width: "100%", height: "100%", lineHeight: "20px", padding: "5px", resize: "none", borderRadius: "5px" }} />
            </div>
            <div style={{ margin: "20px 0px", width: "100%", padding: "0px 10px", height: "40px", lineHeight: "40px" }}>
                <ButtonComp width="large" type="base" value="등록하기" style={{ width: "100%", height: "100%" }} />
            </div>
        </>
    );
}

export default Register;