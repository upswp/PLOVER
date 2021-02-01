import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Badgeslider.module.css";
import classNames from "classnames/bind";
import Imgbox from "../Imgcomponents/Imgbox";
import Badge from 'src/components/Badge/Badge';

const cx = classNames.bind(styles);

class Badgeslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: []
        }
        this.box = React.createRef();
    }

    buildBoxClass = () => {
        let result = "";
        let classes = ['box'];//box 기본 class

        result += cx(...classes);

        return result;
    }

    buildCardboxClass = () => {
        let result = "";
        let classes = ['cardbox'];//box 기본 class

        result += cx(...classes);

        return result;
    }

    buildCardClass = () => {
        let result = "";
        let classes = ['card'];//box 기본 class

        result += cx(...classes);

        return result;
    }


    renderCards = (buf, cardboxClass, cardClass, key) => {
        let temp = [...buf];
        buf.length = 0;
        if (temp.length < this.props.perCount) {
            let len = temp.length;
            for (let i = 0; i < this.props.perCount - len; i++) {
                temp.push([0, 0]);
            }
        }
        return (
            <div className={cardboxClass} key={key}>
                {
                    temp.map((v, i) => {
                        if (v[0] === 0) {
                            return (<div key={"bin_" + i} style={this.props.card}>
                            </div>);
                        } else {
                            return (<div key={"badge_" + v[1]} className={cardClass} style={this.props.card}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "40%" }}><Imgbox src={`${v[0].img}`} size="tiny" shape="circle" style={{ marginRight: "10px", flexShrink: "0" }} /> <span style={{ fontSize: "0.8em", fontWeight: "bold" }}>{`${v[0].nickname.substring(0, 6)} ${v[0].nickname.length > 6 ? ".." : ""}`}</span></div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "40%" }}><Badge ordnum={this.changeNum(v[0].ordnum)} value={v[0].ordnum} /></div>
                            </div>);
                        }
                    })
                }
            </div>
        )
    }

    changeNum = (ordnum) => {
        if (ordnum === "1") {
            return "first";
        } else if (ordnum === "2") {
            return "second";
        } else if (ordnum === "3") {
            return "third";
        } else if (ordnum === "4") {
            return "fourth";
        } else if (ordnum === "5") {
            return "fifth";
        } else {
            return "first";
        }
    }

    resizeHandler = () => {
        this.clientWidth = this.box.current.clientWidth; //보여지는 컨텐츠의 길이

        let obj = {
            x: this.clientWidth,
            hidden: "left"
        }

        this.setState({
            page: obj
        })
    }

    scrollLeft = (x) => {
        this.box.current.scrollLeft -= x;
    }

    scrollRight = (x) => {
        this.box.current.scrollLeft += x;
    }

    scrollHandler = () => {
        if (this.box.current.scrollLeft <= 0) {
            this.setState({
                page: {
                    ...this.state.page,
                    hidden: "left"
                }
            })

            return;
        }

        if (this.box.current.scrollWidth - (this.box.current.scrollLeft + this.box.current.clientWidth) <= 0) {
            this.setState({
                page: {
                    ...this.state.page,
                    hidden: "right"
                }
            })

            return;
        }

        this.setState({
            page: {
                ...this.state.page,
                hidden: "none"
            }
        })
    }

    componentDidMount() {
        this.resizeHandler();
        this.box.current.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
        this.box.current.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        const boxClass = this.buildBoxClass();
        const buffer = [];
        const cardboxClass = this.buildCardboxClass();
        const cardClass = this.buildCardClass();

        return (
            <>
                <div style={{ position: "relative" }}>
                    <div className={boxClass} style={this.props.box === undefined ? {} : this.props.box} ref={this.box}>
                        <div style={{ display: "inline-flex", width: "100%", height: "100%" }}>

                            {
                                this.props.data.map((v, i) => {
                                    if ((i + 1) % this.props.perCount === 0
                                        || i === this.props.data.length - 1) {
                                        buffer.push([v, i]);
                                        return (this.renderCards(buffer, cardboxClass, cardClass, Math.ceil(i / this.props.perCount)));
                                    } else {
                                        buffer.push([v, i]);
                                    }
                                })
                            }

                        </div>
                    </div>
                    {this.state.page.hidden !== "left" && <div onClick={this.scrollLeft.bind(null, this.state.page.x)} className={styles.leftbutton}>{'◀'}</div>}
                    {this.state.page.hidden !== "right" && <div onClick={this.scrollRight.bind(null, this.state.page.x)} className={styles.rightbutton}>{'▶'}</div>}

                </div>
            </>
        );
    }
}

Badgeslider.propTypes = {
    box: PropTypes.object,
    card: PropTypes.object.isRequired,
    perCount: PropTypes.number,
    data: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
}

export default Badgeslider;