import React, { Component } from "react";
import styles from "./Input.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

var offset = (new Date()).getTimezoneOffset() * 60000
var time = (new Date(Date.now() - offset)).toISOString().slice(11,16)

class InputTime extends Component {

    render() {
        var short = false
        if (this.props.short === "true") {
            short = true
        }
        return(
            <input type="time" className={cx('input',{'inputShort':short})} value={time}/>
        )
    }
}

export { InputTime };