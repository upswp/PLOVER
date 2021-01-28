import React, { Component } from "react";
import styles from "./Typo.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Typo extends Component {

    buildTypoClass = () => {
        let result = "";
        const { type } = this.props;
        let classes = ['h1']
          
        if (type) classes.push(type);
  
        result = cx(...classes);

        return result;
    };


    render() {
        return(
            // <p className={this.buildTypoClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}>
            // {this.props.value}</p>
            <p className="h1">
            {this.props.value}</p>
        )
    }
}

export default Typo;