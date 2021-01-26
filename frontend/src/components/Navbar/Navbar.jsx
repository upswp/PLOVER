import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{
                    width: this.props.w,
                    height: this.props.h,
                    lineHeight: this.props.lh ? this.props.lh : this.props.h,
                    marginTop: this.props.mt,
                    marginBottom: this.props.mb,
                    marginLeft: this.props.ml,
                    marginRight: this.props.mr,
                    position: this.props.pos,
                    background: this.props.bg,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"

                }
                }>
                { this.props.children}
            </div >
        );
    }

}

Navbar.propTypes = {
    w: PropTypes.string.isRequired, //width
    h: PropTypes.string.isRequired, //height
    bg: PropTypes.string, //background
    lh: PropTypes.string, //line-height
    mt: PropTypes.string, //margin-top
    mb: PropTypes.string, //margin-bottom
    ml: PropTypes.string, //margin-left
    mr: PropTypes.string, //margin-right
    pos: PropTypes.string, //position
};

export { Navbar };