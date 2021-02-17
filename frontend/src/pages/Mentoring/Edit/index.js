import React, { useEffect, useState, useRef } from 'react';
import styles from "./index.module.css";
import { Navbar, Typo, ImgAttach, Input, Select, InputDate, InputTime, ButtonComp } from "src/components";
import Event from "./event";
import md5 from "md5";
import restapi from "src/api/restapi";

function Edit(props) {

    let [mentoring, setMentoring] = useState({});
    const imgattach = useRef();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [place, setPlace] = useState("");
    const [personnel, setPersonnel] = useState("");

    let event = new Event(props.history);

    useEffect(() => {
        let cb = () => {
            setTitle(document.getElementById("title").value);
            setType(document.getElementById("type").value);
            setStartDate(document.getElementById("startdate").value);
            setStartTime(document.getElementById("starttime").value);
            setEndDate(document.getElementById("enddate").value);
            setEndTime(document.getElementById("endtime").value);
            setPlace(document.getElementById("place").value);
            setPersonnel(document.getElementById("personnel").value);
        }
        event.getMentoring(cb);

        //제목인풋 키업 이벤트등록
        document.getElementById("title").addEventListener('keyup', (e) => {
            setTitle(e.target.value);
        });
        //유형 선택 이벤트 등록
        document.getElementById("type").addEventListener('change', (e) => {
            setType(e.target.value);
        });
        //시작날짜 선택 이벤트등록
        document.getElementById("startdate").addEventListener('change', (e) => {
            setStartDate(e.target.value);
        });
        //시작시간 선택 이벤트등록
        document.getElementById("starttime").addEventListener('change', (e) => {
            setStartTime(e.target.value);
        });
        //종료날짜 선택 이벤트등록
        document.getElementById("enddate").addEventListener('change', (e) => {
            setEndDate(e.target.value);
        });
        //종료시간 선택 이벤트등록
        document.getElementById("endtime").addEventListener('change', (e) => {
            setEndTime(e.target.value);
        });
        //장소 입력 이벤트등록
        document.getElementById("place").addEventListener('keyup', (e) => {
            setPlace(e.target.value);
        });
        //인원 입력 이벤트등록
        document.getElementById("personnel").addEventListener('keyup', (e) => {
            if (isNaN(e.target.value)) e.target.value = "";
            else setPersonnel(e.target.value);
        });
    }, []);

    useEffect(() => {
        event.setTarget(document.getElementById("mentoring_detail"));
        event.mentoring(mentoring);
        event.setMentoring(setMentoring);
        if (mentoring.type) document.getElementById("type").value = mentoring.type;

    }, [mentoring]);

    function removePtag(str) {
        return str.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
    }

    function setLineToPtag(content) {
        let result = "<p style=\"line-height:22px;min-height:22px;\">"
            + content.replace(/\n/g, "</p>\n<p style=\"line-height:22px;min-height:22px;\">")
            + "</p>";
        return result;
    }

    return (
        <div id="metoring_edit">
            <Navbar color="white">
                <span style={{ cursor: "pointer" }} onClick={() => {
                    props.history.goBack();
                }}>
                    <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
                </span>
                <span className={"color_black" + " " + styles.title}><Typo ty="h4">멘토링 수정</Typo></span>
                <span>
                    <i className={"fas fa-chevron-left color_white" + " " + styles.icon}></i>
                </span>
            </Navbar>
            <div className={styles.img_box}>
                <ImgAttach ref={imgattach} id="Image" type="mentoring" className={styles.img}></ImgAttach>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">제목</Typo>
            </div>
            <div className={styles.input_text_box}>
                <Input id="title" value={mentoring.title ? mentoring.title : ""} type="text" className={styles.input_text} />
            </div>
            <div className={styles.desc}>
                <Typo ty="p">유형</Typo>
            </div>
            <div className={styles.select_box}>
                <Select className={styles.select} id="type">
                    <option value="no">유형을 선택해주세요.</option>
                    <option value="live">실시간 라이브</option>
                    <option value="chat">채팅</option>
                    <option value="meet">스터디 모임</option>
                </Select>
            </div>
            <div className={styles.desc} style={{ display: type === "meet" ? "" : "none" }}>
                <Typo ty="p">장소/모집인원</Typo>
            </div>
            <div className={styles.input_datetime_box} style={{ display: type === "meet" ? "" : "none" }}>
                <div className={styles.input_datetime_item}>
                    <Input className={styles.input_datetime} placeholder="장소를 입력하세요." id="place" />
                </div>
                <div className={styles.input_datetime_item}>
                    <Input className={styles.input_datetime} placeholder="모집인원을 입력하세요" id="personnel" />
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">시작 날짜/시간</Typo>
            </div>
            <div className={styles.input_datetime_box}>
                <div className={styles.input_datetime_item}>
                    <InputDate className={styles.input_datetime} id="startdate" value={mentoring.startDate ? mentoring.startDate : ""} />
                </div>
                <div className={styles.input_datetime_item}>
                    <InputTime className={styles.input_datetime} id="starttime" value={mentoring.startTime ? mentoring.startTime : ""} />
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">종료 날짜/시간</Typo>
            </div>
            <div className={styles.input_datetime_box}>
                <div className={styles.input_datetime_item}>
                    <InputDate className={styles.input_datetime} id="enddate" value={mentoring.endDate ? mentoring.endDate : ""} />
                </div>
                <div className={styles.input_datetime_item}>
                    <InputTime className={styles.input_datetime} id="endtime" value={mentoring.endTime ? mentoring.endTime : ""} />
                </div>
            </div>
            <div className={styles.desc}>
                <Typo ty="p">내용</Typo>
            </div>
            <div className={styles.textarea_box}>
                <textarea type="text" className={styles.textarea} id="content" defaultValue={mentoring.content ? removePtag(mentoring.content) : ""}></textarea>
            </div>
            <div className={styles.button_box}>
                <ButtonComp width="large" type="base" textvalue="수정하기" className={styles.button} onClick={() => {
                    //제목검사
                    if (title === "") {
                        alert("제목을 입력해주세요.");
                        return;
                    }
                    //유형검사
                    if (type === "") {
                        alert("유형을 선택해주세요.");
                        return;
                    }
                    //시작날짜 검사
                    if (startDate === "") {
                        alert("시작날짜를 선택해주세요.");
                        return;
                    }

                    //시작시간 검사
                    if (startTime === "") {
                        alert("시작시간을 선택해주세요.");
                        return;
                    }

                    //종료날짜 검사
                    if (endDate === "") {
                        alert("종료날짜를 선택해주세요.");
                        return;
                    }

                    //종료시간 검사
                    if (endTime === "") {
                        alert("종료시간을 선택해주세요.");
                        return;
                    }

                    //장소 검사(타입이 만남일 경우에만)
                    if (type === "meet" && place === "") {
                        alert("장소를 입력해주세요.");
                        return;
                    }

                    //인원 검사(타입이 만남일 경우에만)
                    if (type === "meet" && personnel === "") {
                        alert("모집인원을 입력해주세요.");
                        return;
                    }

                    //이미지 검사
                    if (!imgattach.current.state.imgFile) {
                        alert("이미지를 등록해주세요.");
                        return;
                    }

                    //내용검사
                    if (document.getElementById("content").value === "") {
                        alert("내용을 입력해주세요.");
                        return;
                    }

                    console.log(`제목 : ${title}`);
                    console.log(`유형 : ${type}`);
                    console.log(`시작날짜 : ${startDate}`);
                    console.log(`시작시간 : ${startTime}`);
                    console.log(`종료날짜 : ${endDate}`);
                    console.log(`종료시간 : ${endTime}`);
                    console.log(`내용 : ${setLineToPtag(document.getElementById("content").value)}`);
                    console.log(`장소 : ${place}`);
                    console.log(`모집인원 : ${personnel}`);


                    const mentoring = {
                        title: title,
                        type: type,
                        startDate: startDate,
                        startTime: startTime,
                        endDate: endDate,
                        endTime: endTime,
                        content: setLineToPtag(document.getElementById("content").value),
                        place: place,
                        currentPersonnel: 0,
                        maxPersonnel: Number(personnel)
                    };

                    if (type === "live") {
                        mentoring.address = md5(new Date() + title);
                    }

                    let formData = new FormData();

                    formData.append('file', imgattach.current.state.imgFile);
                    formData.append('mentoring', new Blob([JSON.stringify(mentoring)], { type: 'application/json' }));

                    restapi.put(`/mentoring/${event.getIndex()}`, formData)
                        .then((res) => {
                            if (res.status == 200) {
                                console.log(res)
                                alert("수정 성공");
                                props.history.push('/mentoring/list');
                            }
                            else {
                                console.log(res);
                                alert('수정 실패');
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            alert('수정 실패');
                        })

                }} />
            </div>
        </div>
    );
}

export default Edit;