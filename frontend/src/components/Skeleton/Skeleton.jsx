import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Skeleton.module.css";


class Skeleton extends Component {
    constructor(props) {
        super(props);
    }

    createShape(shape) {
        let radius = 0;
        if (shape === "rect") {
            radius = "0px";
        } else if (shape === "rectRound") {
            radius = "5px";
        } else if (shape === "circle") {
            radius = "50%";
        }

        return radius;
    }

    render() {
        this.radius = this.createShape(this.props.shape);

        return (
            <div className={styles.bg} style={{
                borderRadius: this.radius,
                width: this.props.w,
                height: this.props.h,
                lineHeight: this.props.lh,
                marginTop: this.props.mt,
                marginBottom: this.props.mb,
                marginLeft: this.props.ml,
                marginRight: this.props.mr,
                position: this.props.pos,
                display: this.props.dp
            }}>
                {this.props.children}
            </div>
        )
    }
}

Skeleton.propTypes = {
    shape: PropTypes.string.isRequired, //rect,rectRound,circle
    w: PropTypes.string.isRequired, //width
    h: PropTypes.string.isRequired, //height
    lh: PropTypes.string, //line-height
    mt: PropTypes.string, //margin-top
    mb: PropTypes.string, //margin-bottom
    ml: PropTypes.string, //margin-left
    mr: PropTypes.string, //margin-right
    pos: PropTypes.string, //position
    dp: PropTypes.string //display
};

export { Skeleton };