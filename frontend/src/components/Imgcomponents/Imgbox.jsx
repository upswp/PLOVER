import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Imgbox.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


class Imgbox extends Component {

    buildImgboxClass = () => {
        let result = "";
        const { size, shape } = this.props;
        let classes = ['box'];//bg는 스켈레톤 기본 class

        if (size) classes.push(size);
        if (shape) classes.push(shape);

        result += cx(...classes);

        return result;
    };


    render() {
        return (
            <div id={this.props.id} className={this.buildImgboxClass() + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style}
                onClick={this.props.onClick}>

                {   this.props.src ?
                    <img
                        className={styles.image}
                        src={`${process.env.REACT_APP_PUBLIC_HOST}/${this.props.src}`}

                    /> : "이미지 없음"}
            </div>
        );
    }
}

Imgbox.propTypes = {
    shape: PropTypes.string.isRequired, //rect circle rectRound
    size: PropTypes.string
};



export default Imgbox;