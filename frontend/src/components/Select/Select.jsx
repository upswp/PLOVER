import React, { Component } from "react";
import styles from "./Select.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);



class Select extends Component {

    buildSelectClass = () => {
        let result = "";
        const { width, height } = this.props;
        let classes = ['select']
          
        if (width) classes.push(width);
        if (height) classes.push(height);
  
        result += cx(...classes);

        return result;
    };

    createOptionList = () => {
        const options = this.props.option;
        const optionSplit = options.split("/")
        
        const optionList = optionSplit.map((optionSplit) =>
          <option value={optionSplit}>{optionSplit}</option>
        )

        return optionList;
    }

    render() {
        return (
            <select className={this.buildSelectClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}>
            <option value="">{this.props.default}</option>
            <this.createOptionList />
            </select>
        )
    }
}

export default Select;