import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Noticeslider.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Noticeslider extends Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
    }

    buildBoxClass = () => {
        let result = "";
        let classes = ['box'];//box 기본 class

        result += cx(...classes);

        return result;
    }

    buildNoticeClass = () => {
        let result = "";
        let classes = ['notice'];//box 기본 class

        result += cx(...classes);

        return result;
    }

    componentDidMount() {
        this.timerId = setTimeout(function tick() {
            if (this.box.current.scrollTop + this.box.current.clientHeight + 4 >= this.box.current.scrollHeight) {
                this.box.current.scrollTop = 0;
            } else {
                this.box.current.scrollTop += (this.box.current.clientHeight + 4);
            }
            this.timerId = setTimeout(tick.bind(this), this.props.duration);
        }.bind(this), this.props.duration);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const boxClass = this.buildBoxClass();
        const noticeClass = this.buildNoticeClass();

        return (
            <div id={this.props.id} className={boxClass + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style} ref={this.box}>
                {
                    this.props.data.map((v, i) => {
                        return (
                            <div className={noticeClass} key={"notice_" + i} onClick={() => { this.props.history.push(v.url) }} style={this.props.style.height ? { height: this.props.style.height } : {}}>
                                <div style={{ width: "50px", height: "100%", fontSize: "0.7em", lineHeight: "3" }}>
                                    {v.gubun}
                                </div>
                                <div style={{ flex: "1", height: "100%", fontSize: "0.7em", fontWeight: "bold", lineHeight: "3", textAlign: "left", paddingLeft: "20px", overflow: "hidden" }}>
                                    {v.title}
                                </div>
                                <div style={{ width: "50px", height: "100%", fontSize: "0.7em", lineHeight: "3" }}>
                                    {v.time}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

Noticeslider.propTypes = {
    data: PropTypes.array.isRequired,
    duration: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired
}

export default Noticeslider;