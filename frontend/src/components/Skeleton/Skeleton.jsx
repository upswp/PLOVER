import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Skeleton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Skeleton extends Component {

    buildSkeletonClass = () => {
        let result = "";
        const { size, shape } = this.props;
        let classes = ['bg'];//bg는 스켈레톤 기본 class

        if (size) classes.push(size);
        if (shape) classes.push(shape);

        result += cx(...classes);

        return result;
    };

    render() {

        return (
            <div className={this.buildSkeletonClass() + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

Skeleton.propTypes = {
    shape: PropTypes.string.isRequired, //rect,rectRound,circle
    size: PropTypes.string //mini tiny small mid large big auto
};

export { Skeleton };