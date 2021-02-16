import React, { useEffect } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, ImgAttach, Input, Select, InputDate, InputTime, ButtonComp } from "src/components";
import Event from "./event";

function Edit(props) {
    useEffect(() => {
        const event = new Event(document.getElementById("metoring_edit"));



        return () => {
            event.destroy();
        };
    }, []);

    return (
        <div id="metoring_edit">
            <Navbar color="white">
                <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
                <span className={"color_black" + " " + styles.title}><Typo ty="h4">멘토링 수정</Typo></span>
                <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
            </Navbar>
            <div className={styles.img_box}>
                <ImgAttach type="mentoring" className={styles.img} imgUrl="/images/mentor_1.png"></ImgAttach>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">제목</Typo>
            </div>
            <div className={styles.input_text_box}>
                <Input value="제목 편집" type="text" className={styles.input_text} />
            </div>
            <div className={styles.desc}>
                <Typo ty="p">유형</Typo>
            </div>
            <div className={styles.select_box}>
                <Select className={styles.select} value="test2">
                    <option>유형을 선택해주세요.</option>
                    <option value="test2">실시간 라이브</option>
                    <option value="test3">채팅</option>
                    <option value="test4">스터디 모임</option>
                </Select>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">시작 날짜/시간</Typo>
            </div>
            <div className={styles.input_datetime_box}>
                <div className={styles.input_datetime_item}>
                    <InputDate className={styles.input_datetime} value="2020-02-16" />
                </div>
                <div className={styles.input_datetime_item}>
                    <InputTime className={styles.input_datetime} value="13:14:00" />
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">종료 날짜/시간</Typo>
            </div>
            <div className={styles.input_datetime_box}>
                <div className={styles.input_datetime_item}>
                    <InputDate className={styles.input_datetime} value="2020-02-16" />
                </div>
                <div className={styles.input_datetime_item}>
                    <InputTime className={styles.input_datetime} value="13:14:00" />
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">내용</Typo>
            </div>
            <div className={styles.textarea_box}>
                <textarea type="text" className={styles.textarea} defaultValue="내용 입력"></textarea>
            </div>
            <div className={styles.button_box}>
                <ButtonComp width="large" type="base" textvalue="수정하기" className={styles.button} />
            </div>
        </div>
    );
}

export default Edit;