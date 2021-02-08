import React from 'react';
import { Navbar, Tabs, Typo
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Input, ImgAttach, Select, ButtonComp, 
//     // , InputTime, InputDate, Navbutton, Input
} from "../../components";
import styles from "./index.module.css";
import axios from 'axios'


const Follow = (props) => {
  return (
    <div className={styles.container}>
    <div className={styles.head}>
    <Navbar className={styles.nav}>
      <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
      <span className={"color_black" + " " + styles.title}><Typo ty="h4">id</Typo></span>
      {/* <i className={"fas fa-search"}></i> */}
    </Navbar>
    <Tabs className={styles.tab}>
      <div label="팔로잉">
      <p>TAB 1 contents</p>
      </div>
      <div label="팔로워">
      <p>TAB 2 contents</p>
      </div>
    </Tabs>
    </div>
    </div>
  )
}

export default Follow;