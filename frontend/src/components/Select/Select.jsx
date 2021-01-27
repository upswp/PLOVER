import React, { Component } from "react";
import styles from "./Select.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Select extends Component {
    render() {
        var short = false
        if (this.props.short === "true") {
            short = true
        }
        return (
            <select className={cx('select', { 'selectShort': short })}>
                <option value="">SELECT</option>
                <option value="a">a</option>
                <option value="b">b</option>
            </select>
        )
    }
}

export { Select };