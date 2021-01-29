import React, { Component } from "react";
import styles from "./ImgAttach.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class ImgAttach extends Component {

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

//     thumbnail = (e) => {
//         var reader = new FileReader()
//         reader.onload = function(e) {
//             var img = document.createElement("img")
//             img.setAttribute("src",e.target.result)
//             document.querySelector("div#imageButton").appendChild(img)
//         }
//         reader.readAsDataURL(e.target.files[0])
//     }

//     upload() {
//         document.getElementById('icon_upload').click();
//     }

    render() {
        return(
            <>
              <input type="file"
              className={this.buildInputClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}/>
              {/* <img 
              className={this.buildImgClass()+ " " + (this.props.className === undefined ? '' : this.props.className)}/> */}
              
            </>
        )
    }
}
export default ImgAttach;