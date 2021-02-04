import React from 'react';
import { Navbar, Typo, ImgAttach } from "src/components";

function Register(props) {
    return (
        <>
            <Navbar color="white">
                <i class="fas fa-chevron-left color_black" style={{ fontSize: "1.1em", marginLeft: "10px" }}></i>
                <span className="color_black" style={{ margin: "0 auto", fontWeight: "bold" }}><Typo ty="h4">회원가입</Typo></span>
                <i class="fas fa-chevron-left color_white" style={{ fontSize: "1.1em", marginRight: "10px" }}></i>
            </Navbar>
            <div style={{ width: "100%", padding: "10px", height: "200px" }}>
                <ImgAttach type="mentoring" style={{ width: "100%", height: "100%" }}></ImgAttach>
            </div>
            <div style={{ marginTop: "20px", width: "100%", paddingLeft: "5px", height: "30px", lineHeight: "30px" }}>
                <Typo ty="p">제목</Typo>
            </div>
        </>
    );
}

export default Register;