import React, { Component } from "react";
import PropTypes from "prop-types"
import styles from "./Navbutton.module.css";

class Navbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opend: false,
        }
    }

    clickListener = () => {
        this.setState({
            opend: !this.state.opend
        });
        this.props.F && this.props.F();
    }

    render() {
        return (
            <div
                className={styles.navbutton}
                onClick={this.clickListener}
                style={{
                    width: "30px",
                    height: "30px",
                    marginTop: this.props.mt,
                    marginBottom: this.props.mb,
                    marginLeft: this.props.ml,
                    marginRight: this.props.mr,
                }}
            >
                <div className={this.state.opend ? styles['line'] + " " + styles['opend'] : styles.line} style={{ background: this.props.color }}></div>
                <div className={this.state.opend ? styles['line'] + " " + styles['opend'] : styles.line} style={{ background: this.props.color }}></div>
                <div className={this.state.opend ? styles['line'] + " " + styles['opend'] : styles.line} style={{ background: this.props.color }}></div>
            </div>
        );
    }
}

Navbutton.propTypes = {
    color: PropTypes.string,
    mt: PropTypes.string, //margin-top
    mb: PropTypes.string, //margin-bottom
    ml: PropTypes.string, //margin-left
    mr: PropTypes.string, //margin-right
    F: PropTypes.func, //function
};

export { Navbutton };