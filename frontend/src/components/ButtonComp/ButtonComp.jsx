import React, { Component } from 'react';
import styles from './ButtonComp.module.css';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ButtonComp extends Component {

  buildButonCompClass = () => {
    let result = "";
    const { width, type, value } = this.props;
    let classes = ['button'];

    if (width) classes.push(width);
    if (type) classes.push(type);
    if (value) classes.push(value);

    result += cx(...classes);

    return result;
  };

  render() {
    return (
      <>
        <button className={this.buildButonCompClass() + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style}>
          {this.props.value}
        </button>
      </>
    );
  }
}

export default ButtonComp;