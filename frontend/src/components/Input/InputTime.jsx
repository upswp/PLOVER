import React, { Component } from "react";
import styles from "./Input.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class InputTime extends Component {

    buildInputDateClass = () => {
        let result = "";
        const { width, height } = this.props;
        let classes = ['input']

        if (width) classes.push(width);
        if (height) classes.push(height);

        result += cx(...classes);

        return result;
    };

    render() {
        return (
            <input id={this.props.id} type="time" id="time"
                className={this.buildInputDateClass() + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style} />
        )
    }
}

export default InputTime;