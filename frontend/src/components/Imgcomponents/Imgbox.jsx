import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Imgbox.module.css";

class Imgbox extends Component {
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

    createImg(src) {
        console.log(src);
        console.log(typeof src);
    }

    render() {
        this.src = this.createImg(this.props.src);
        this.radius = this.createShape(this.props.shape);

        return (
            <div
                style={{
                    borderRadius: this.radius,
                    width: this.props.w,
                    height: this.props.h,
                    lineHeight: this.props.lh ? this.props.lh : this.props.h,
                    marginTop: this.props.mt,
                    marginBottom: this.props.mb,
                    marginLeft: this.props.ml,
                    marginRight: this.props.mr,
                    position: this.props.pos,
                    display: this.props.dp,
                    overflow: "hidden",
                    background: "gray",
                    textAlign: "center",
                    color: "white",
                    fontSize: "0.8em"
                }} >

                {   this.props.src ?
                    <img
                        className={
                            this.props.hover && styles.image
                        }
                        src={this.props.src}

                        style={{
                            width: "100%",
                            height: "100%"
                        }}

                    /> : "이미지 없음"}
            </div>
        );
    }
}

Imgbox.propTypes = {
    shape: PropTypes.string.isRequired, //rect circle rectRound
    w: PropTypes.string.isRequired, //width
    h: PropTypes.string.isRequired, //height
    hover: PropTypes.bool, //hover시 이미지 zoomIn out 여부
    src: PropTypes.string, //이미지가져오기 없으면 기본 이미지 부여
    lh: PropTypes.string, //line-height
    mt: PropTypes.string, //margin-top
    mb: PropTypes.string, //margin-bottom
    ml: PropTypes.string, //margin-left
    mr: PropTypes.string, //margin-right
    pos: PropTypes.string, //position
    dp: PropTypes.string //display
};



export { Imgbox };