import React, { Component } from "react";
import styles from "./Typo.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Typo extends Component {

    buildTypoClass = () => {
        let result = "";
        const { type } = this.props;
        let classes = ['default']
          
        if (type) classes.push(type);
  
        result += cx(...classes);

        return result;
    };


    render() {
        return(
            <div className={this.buildTypoClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}>
                <p>{this.props.value}</p>
            </div>
        )
    }
}

export default Typo;