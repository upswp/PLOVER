import React, { Component } from "react";
import styles from "./ImgAttach.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ImgAttach extends Component {

  constructor(props) {
    super(props);
    this.Inputfile = React.createRef();
    this.state = {
      imgUrl: "",
      imgFile: null
    };
    if (props.imgUrl) this.state = { ...this.state, imgUrl: props.imgUrl };
    if (props.imgFile) this.state = { ...this.state, imgFile: props.imgFile };
  }

  handleChangeFile = event => {
    let reader = new FileReader();
    reader.onloadend = e => {
      const base64 = reader.result;
      console.log(base64)
      if (base64) {
        this.setState({
          imgUrl: base64.toString()
        });
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0])
      this.setState({
        imgFile: event.target.files[0]
      });
    }
    console.log(this.imgFile)
    console.log(this.imgUrl)
  };

  handleRemove = () => {
    this.setState({
      imgUrl: "",
      imgFile: null
    });
  };

  buildBoxClass = () => {
    let result = "";
    const { type } = this.props;
    let classes = ['box']

    if (type) classes.push(type);
    classes.push('boxM')

    result += cx(...classes);
    return result;
  };
  buildInputClass = () => {
    let result = "";
    const { type } = this.props;
    let classes = ['input']

    if (type) classes.push(type);
    classes.push('opacity')

    result += cx(...classes);
    return result;
  };

  buildImgClass = () => {
    let result = "";
    const { type } = this.props;
    let classes = ['profile']

    if (type) classes.push(type);
    classes.push('absolute')

    result += cx(...classes);
    return result;
  };

  render() {
    return (
      <div id={this.props.id} className={styles.box + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style}>
        <input id={this.props.id} type="file" name="imgFile" id="ex_file" onChange={this.handleChangeFile}
          className={this.props.type === undefined ? styles.input : styles.inputM} ref={this.Inputfile} />
        <img src={this.state.imgUrl ? this.state.imgUrl : "/images/default-image.png"} onClick={this.handleRemove} alt=""
          className={this.props.type === undefined ? styles.profile : styles.mentoring} />
        <label className={styles.attach_icon} style={{ cursor: "pointer" }} onClick={() => { this.Inputfile.current.click(); }}>
          <i className="fas fa-camera-retro color_black" style={{ fontSize: "1.0m", height: "100%" }}></i>
        </label>
      </div>
    )
  }
}
export default ImgAttach;
