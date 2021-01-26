import React, { Component } from "react";
import styles from "./Input.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Input extends Component {

    render() {
        var short = false
        if (this.props.short === "true") {
            short = true
        }
        return(
            <input type="text" className={cx('input',{'inputShort':short})}/>
        )
    }
}

export { Input };