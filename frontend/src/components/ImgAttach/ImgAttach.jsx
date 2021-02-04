import React, { Component } from "react";
import styles from "./ImgAttach.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ImgAttach extends Component {

  constructor(props) {
    super(props);
    this.Inputfile = React.createRef();
  }

  state = {
    imgUrl: "",
    imgFile: null
  };

  handleChangeFile = event => {
    let reader = new FileReader();
    reader.onloadend = e => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          imgUrl: base64.toString() // 파일 base64 상태 업데이트
        });
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
      this.setState({
        imgFile: event.target.files[0] // 파일 상태 업데이트 업로드 하는것은 파일이기 때문에 관리 필요
      });
    }
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
      <div className={styles.box + " " + (this.props.className === undefined ? '' : this.props.className)} style={this.props.style}>
        <input type="file" name="imgFile" id="ex_file" onChange={this.handleChangeFile}
          className={this.props.type === undefined ? styles.input : styles.inputM} ref={this.Inputfile} />
        <img src={this.state.imgUrl ? this.state.imgUrl : "/images/default-image.png"} onClick={this.handleRemove}
          className={this.props.type === undefined ? styles.profile : styles.mentoring} />
        <label className={styles.attach_icon} style={{ cursor: "pointer" }} onClick={() => { this.Inputfile.current.click(); }}>
          <i className="fas fa-camera-retro color_black" style={{ fontSize: "1.0m", height: "100%" }}></i>
        </label>
      </div>
    )
  }
}
export default ImgAttach;
