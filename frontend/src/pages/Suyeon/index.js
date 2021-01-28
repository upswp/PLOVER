import React from "react";
import Select from 'src/components/Select/Select';
import InputTime from 'src/components/Input/InputTime';
import InputDate from 'src/components/Input/InputDate';
import Input from 'src/components/Input/Input';
import Typo from 'src/components/Typo/Typo';
// import styles from "./index.module.css";

function Page() {
    return (
        <div>
            수연페이지<br/><br/>
            {/* 
            Input, InputDate, InputTime의 선택 가능한 옵션: width(2) height(2) placeholder
            width = "short"일 때 너비 170px (디폴트 345px)
            height = "tall"일 시 높이 110px (디폴트 40px)
            placeholder = "기본 문구"
             */}
            <p>Input</p><Input height="tall" placeholder="tall inputbox"></Input><br/>
            <p>InputDate</p><InputDate width="short" placeholder="short inputbox"></InputDate><br/>
            <p>InputTime</p><InputTime></InputTime><br/>
            {/*
            Select의 선택 가능한 옵션: width(2) height(2)
            width = "short"일 때 너비 170px (디폴트 345px)
            height = "tall"일 시 높이 110px (디폴트 40px)
            default = "placeholder"
            */}
            <p>Select, Option</p>
            <Select
                option="1/2/3" default="default"></Select>

            {/*
            Typo (typography)의 선택 가능한 옵션: ty (type) value(입력)
            자주 쓸 컴포넌트이므로 의도적으로 알파벳 수를 줄임 (불편하다면 ty > type로?)
            제목 속성: h1 (40px, 두께 900), h2 (40px, 두께 700), h3 (40px, 두께 500), h4 (40px, 두께 500),
            본문 속성: para(본문 16px, 두께 400) desc(작은 설명 12px, 두께 300)
             */}
            <Typo ty="h1" value="h1"></Typo>
            <Typo ty="h2" value="h2"></Typo>
            <Typo ty="h3" value="h3"></Typo>
            <Typo ty="h4" value="h4"></Typo>
            <Typo ty="para" value="para"></Typo>
            <Typo ty="desc" value="desc"></Typo>
        </div>
    )
};

export default Page;