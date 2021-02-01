import React, { Component } from "react";
import styles from "./Input.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class InputDate extends Component {

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
        // let date = new Date().toISOString().slice(0,10) // 2021-01-29
        return (
            <input type="date" id="dateD"
            className={this.buildInputDateClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}/>
        )
    }
}

export default InputDate;