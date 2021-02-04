import React from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, ImgAttach, Input, Select, InputDate, InputTime, ButtonComp } from "src/components";

function Register(props) {
    return (
        <>
            <Navbar color="white">
                <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
                <span className={"color_black" + " " + styles.title}><Typo ty="h4">멘토링 등록</Typo></span>
                <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
            </Navbar>
            <div className={styles.img_box}>
                <ImgAttach type="mentoring" className={styles.img}></ImgAttach>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">제목</Typo>
            </div>
            <div className={styles.input_text_box}>
                <Input placeholder="제목을 입력해주세요." type="text" className={styles.input_text} />
            </div>
            <div className={styles.desc}>
                <Typo ty="p">유형</Typo>
            </div>
            <div className={styles.select_box}>
                <Select className={styles.select}>
                    <option value="test1">유형을 선택해주세요.</option>
                    <option value="test1">실시간 라이브</option>
                    <option value="test1">채팅</option>
                    <option value="test1">스터디 모임</option>
                </Select>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">시작 날짜/시간</Typo>
            </div>
            <div className={styles.input_datetime_box}>
                <div className={styles.input_datetime_item}>
                    <InputDate className={styles.input_datetime}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputDate>
                </div>
                <div className={styles.input_datetime_item}>
                    <InputTime className={styles.input_datetime}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputTime>
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">종료 날짜/시간</Typo>
            </div>
            <div className={styles.input_datetime_box}>
                <div className={styles.input_datetime_item}>
                    <InputDate className={styles.input_datetime}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputDate>
                </div>
                <div className={styles.input_datetime_item}>
                    <InputTime className={styles.input_datetime}>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                        <option value="test1">test1</option>
                    </InputTime>
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">내용</Typo>
            </div>
            <div className={styles.textarea_box}>
                <textarea placeholder="내용을 입력해주세요." type="text" className={styles.textarea} />
            </div>
            <div className={styles.button_box}>
                <ButtonComp width="large" type="base" value="등록하기" className={styles.button} />
            </div>
        </>
    );
}

export default Register;