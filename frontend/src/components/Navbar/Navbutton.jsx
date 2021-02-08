import React, { Component } from "react";
import PropTypes from "prop-types"
import styles from "./Navbutton.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Navbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opend: false,
        }
        this.navbutton = React.createRef();
    }

    buildNavbuttonClass = () => {
        let result = "";
        let classes = ['navbutton'];//navbutton는 navbutton 기본 class

        result += cx(...classes);

        return result;
    };

    buildNavbuttonlineClass = () => {
        let result = "";
        const { color } = this.props;
        let classes = ['line'];//line는 button의 3개의 선

        result += cx(...classes);
        if (color) {
            result += (" bg_" + color);
        };

        return result;
    }

    clickHandler = () => {
        this.setState({ opend: !this.state.opend });
        this.props.setShowMenu(!this.props.showMenu);
    }

    componentDidMount() {
        this.navbutton.current.addEventListener('click', this.clickHandler);

    }

    componentWillUnmount() {
        this.navbutton.current.removeEventListener('click', this.clickHandler);
    }


    render() {
        return (
            <div
                className={this.buildNavbuttonClass() + " " + (this.props.className === undefined ? '' : this.props.className)}
                onClick={this.props.onClick}
                ref={this.navbutton}
                style={this.props.style}
            >
                <div className={this.buildNavbuttonlineClass() + " " + (this.state.opend && styles.opend)}></div>
                <div className={this.buildNavbuttonlineClass() + " " + (this.state.opend && styles.opend)}></div>
                <div className={this.buildNavbuttonlineClass() + " " + (this.state.opend && styles.opend)}></div>
            </div>
        );
    }
}

Navbutton.propTypes = {
    color: PropTypes.string
};

export default Navbutton;