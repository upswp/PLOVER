import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Navbar extends Component {

    buildNavbarClass = () => {
        let result = "";
        const { color } = this.props;
        let classes = ['navbar'];//navbar는 navbar 기본 class

        result += cx(...classes);
        if (color) {
            result += (" bg_" + color);
        };

        return result;
    };

    render() {
        return (
            <div className={this.buildNavbarClass() + " " + (this.props.className === undefined ? '' : this.props.className)}
                style={this.props.style}>
                {this.props.children}
            </div >
        );
    }

}

Navbar.propTypes = {
    color: PropTypes.string
};

export default Navbar;