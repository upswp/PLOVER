import React, { Component } from "react";
import styles from "./Typo.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Typo extends Component {

  buildTypoClass = () => {
    let result = "";
    const { ty } = this.props;
    let classes = ['p']

    if (ty) classes.push(ty);

    result += cx(...classes);
    return result;
  };


  render() {
    return (
      <>
        <p id={this.props.id} className={this.buildTypoClass() + " " + (this.props.className === undefined ? '' : this.props.className)}>{this.props.children}</p>
      </>
    )
  }
}

export default Typo;