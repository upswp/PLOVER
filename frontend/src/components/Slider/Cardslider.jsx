import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Cardslider.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Cardslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: []
        }
        this.box = React.createRef();
    }

    buildBoxClass = () => {
        let result = "";
        let classes = ['box'];//box 기본 class

        result += cx(...classes);

        return result;
    }

    buildCardClass = () => {
        let result = "";
        let classes = ['card'];//card 기본 class

        result += cx(...classes);

        return result;
    }

    buildBadgeClass = () => {
        let result = "";
        let classes = ['badge'];//badge 기본 class

        result += cx(...classes);

        return result;
    }

    buildPointboxClass = () => {
        let result = "";
        let classes = ['pointbox'];//badge 기본 class

        result += cx(...classes);

        return result;
    }

    buildPulseClass = (item) => {
        let result = "";
        let color = null;

        let classes = ['pulse'];//pulse 기본 class
        if (color) {
            classes.push('pulse_' + color);
        };

        result += cx(...classes);

        return result;
    }

    buildTitleClass = () => {
        let result = "";
        let classes = ['title'];//title 기본 class

        result += cx(...classes);

        return result;
    }

    scrollHandler = () => {
        let scrollLeft = this.box.current.scrollLeft;
        let activeindex = Math.ceil(1 + (scrollLeft / this.clientWidth)) - 1;
        if (!this.state.point[activeindex].active) {
            let point = Object.assign([], this.state.point);
            for (let i = 0; i < point.length; i++) {
                if (i !== activeindex) {
                    point[i].active = false;
                } else {
                    point[i].active = true;
                }
            }
            this.setState({
                point
            })
        }

    }

    resizeHandler = () => {

        this.scrollWidth = this.box.current.scrollWidth; //스크롤 총 길이
        this.clientWidth = this.box.current.clientWidth; //보여지는 컨텐츠의 길이
        this.pointlength = Math.ceil(this.scrollWidth / this.clientWidth); //포인트 개수
        console.log(this.scrollWidth);
        console.log(this.clientWidth);


        let arr = new Array(this.pointlength);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                x: this.clientWidth * i, //이동할 scrollLeft좌표
                active: false
            };
        }

        if (arr.length > 0) arr[0].active = true;

        console.log(arr);

        this.setState({
            point: arr
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            this.resizeHandler();
        }
    }

    scrollTo = (x) => {
        this.box.current.scrollLeft = x;
    }

    componentDidMount() {
        this.resizeHandler();
        this.box.current.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        this.resizeHandler();
        this.box.current.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.resizeHandler);
    }

    toColor(type) {
        if (type === "meet") {
            return "purple"
        } else if (type === "chat") {
            return "blue"
        }
        return "black";
    }

    render() {
        const boxClass = this.buildBoxClass();
        const cardClass = this.buildCardClass();
        const badgeClass = this.buildBadgeClass();
        const pointboxClass = this.buildPointboxClass();

        return (
            <>
                <div id={this.props.id} className={boxClass + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style} ref={this.box}>
                    <div style={{ display: "inline-flex" }}>
                        {
                            this.props.data.map((v, i) => {

                                return (
                                    <div key={"card_" + i} className={cardClass} onClick={() => { this.props.history.push(`/mentoring/detail/${v.id}`) }} style={this.props.card === undefined ? {} : this.props.card}>
                                        <img src={`${process.env.REACT_APP_PUBLIC_HOST}/${v.mentoringImageUrl}`} style={{ height: "100%" }} />
                                        <div className={badgeClass + " bg_" + this.toColor(v.type)}>
                                            {v.type.toUpperCase()}
                                            <div className={this.buildPulseClass(v)}></div>
                                        </div>
                                        <div className={this.buildTitleClass()}>{v.title}</div>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                <div className={pointboxClass}>
                    {
                        this.state.point.map((v, i) => {

                            return (
                                <div key={`point_${i}`} className={styles.point + " " + (v.active ? styles.active : '')} onClick={this.scrollTo.bind(null, v.x)}></div>
                            )

                        })
                    }
                </div>
            </>
        )
    }
}

Cardslider.propTypes = {
    box: PropTypes.object,//박스사이즈
    card: PropTypes.object,//카드사이즈
    data: PropTypes.array.isRequired,//데이터
    //isPoint: PropTypes.bool, //점 존재하는가 ?
    //isAuto: PropTypes.bool, //자동슬라이드 여부
    history: PropTypes.object.isRequired //히스토리 객체
};

/* 
    data 정의하기
    img : 이미지경로
    badgeColor
    badgeValue
    pulseColor
    url : 링크
*/


export default Cardslider;