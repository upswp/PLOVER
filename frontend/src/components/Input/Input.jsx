import React, { Component } from "react";
import styles from "./Input.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Input extends Component {

    buildInputClass = () => {
        let result = "";
        const { width, height } = this.props;
        let classes = ['input']
          
        if (width) classes.push(width);
        if (height) classes.push(height);
  
        result += cx(...classes);

        return result;
    };

    render() {
        return(
            <input type={this.props.type} placeholder={this.props.placeholder}
            className={this.buildInputClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}
            />
        )
    }
}
export default Input;