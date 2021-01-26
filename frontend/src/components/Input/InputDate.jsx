import React, { Component } from "react";
import styles from "./Input.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

var date = new Date().toISOString().slice(0,10)

class InputDate extends Component {

    render() {
        var short = false
        if (this.props.short === "true") {
            short = true
        }
        return(
            <input type="date" className={cx('input',{'inputShort':short})} value={date}/>
        )
    }
}

export { InputDate };