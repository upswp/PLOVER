import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Skeleton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Skeleton extends Component {
    constructor(props) {
        super(props);
    }

    buildSkeletonClass = () => {
        const { size, shape } = this.props;
        let classes = ['bg'];//bg는 스켈레톤 기본 class

        if (size) classes.push(size);
        if (shape) classes.push(shape);

        return cx(...classes);
    };

    render() {

        return (
            <div className={this.buildSkeletonClass() + " " + this.props.className} style={this.props.style}>
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