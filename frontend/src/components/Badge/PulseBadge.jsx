import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./PulseBadge.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class PulseBadge extends Component {
    buildBadgeClass = () => {
        let result = "";
        let classes = ['badge'];//badge 기본 class

        result += cx(...classes);

        return result;
    }



    buildPulseClass = (pulseColor) => {
        let result = "";

        let classes = ['pulse'];//pulse 기본 class
        if (pulseColor) {
            classes.push('pulse_' + pulseColor);
        };

        result += cx(...classes);

        return result;
    }


    render() {
        const badgeClass = this.buildBadgeClass();
        const pulseClass = this.buildPulseClass(this.props.pulseColor);

        return (
            <div className={badgeClass + " " + "bg_" + this.props.bg} style={this.props.style}>
                {this.props.title}
                <div className={pulseClass}></div>
            </div>
        )
    }
}

PulseBadge.propTypes = {
    title: PropTypes.string.isRequired,
    bg: PropTypes.string,
    pulseColor: PropTypes.string,
};



export { PulseBadge };