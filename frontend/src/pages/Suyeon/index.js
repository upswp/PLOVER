import React from "react";
import Select from 'src/components/Select/Select';
import InputTime from 'src/components/Input/InputTime';
import InputDate from 'src/components/Input/InputDate';
import Input from 'src/components/Input/Input';
import Typo from 'src/components/Typo/Typo';
import ImgAttach from 'src/components/ImgAttach/ImgAttach';
// import styles from "./index.module.css";

function Page() {
    return (
        <div>
            수연페이지<br/><br/>
            {/* 
            Input, InputDate, InputTime의 선택 가능한 옵션: width(2) height(2) placeholder type
              width = "short"일 때 너비 170px (디폴트 345px)
              height = "tall"일 시 높이 110px (디폴트 40px)
              placeholder = "기본 문구"
              type = "email password text..." 입력 가능
             */}
            <p>Input</p><Input height="tall" placeholder="tall inputbox" type="text"></Input><br/>
            <p>InputDate</p><InputDate width="short" placeholder="short inputbox"></InputDate><br/>
            <p>InputTime</p><InputTime></InputTime><br/>
            {/*
            Select의 선택 가능한 옵션: width(2) height(2)
              width = "short"일 때 너비 170px (디폴트 345px)
              height = "tall"일 시 높이 110px (디폴트 40px)
              default = "placeholder"
            선택지 넣는 법
              option = "option1/option2/option3" (슬래시/로 구분함)
            */}
            <p>Select, Option</p>
            <Select
                option="1/2/3" default="default"></Select>

            {/*
            Typo (typography)의 선택 가능한 옵션: ty (type) value(입력)
            자주 쓸 컴포넌트이므로 의도적으로 알파벳 수를 줄임 (불편하다면 ty > type로?)
            디폴트 속성은 size 16px, weight 400
              제목 속성: h1 (40px, 두께 900), h2 (40px, 두께 700), h3 (40px, 두께 500), h4 (40px, 두께 500),
              본문 속성: default(본문 16px, 두께 400) desc(작은 설명 12px, 두께 300)
             */}
            <Typo ty="h1" value="h1"></Typo>
            <Typo ty="h2" value="h2"></Typo>
            <Typo ty="h3" value="h3"></Typo>
            <Typo ty="h4" value="h4"></Typo>
            <Typo ty="p" value="default"></Typo>
            <Typo ty="desc" value="desc"></Typo>
            {/* 
            ImgAttach의 선택 가능한 옵션: type(2) src(배경사진) placeholder(기본문구)
              type = "profile(기본값) mentoring"
                profile - 너비, 높이 130px의 원형
                mentoring - 너비 350px, 높이 250px의 직사각형
              src = "http:// ... /"
            */} 
            <ImgAttach></ImgAttach><br/><br/><br/><br/><br/>
            <ImgAttach type="mentoring"></ImgAttach>
        </div>
    )
};

export default Page;