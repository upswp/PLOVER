import React, { useState, useEffect } from 'react';
import { Navbar, Tabs, Input
//     // Skeleton, Cardslider, Badgeslider, Noticeslider, PulseBadge
//     // , Badge, ButtonComp, Input, ImgAttach, Select, ButtonComp, 
//     // , InputTime, InputDate, Navbutton, Typo
} from "../../components";
import styles from "./index.module.css";
import axios from 'axios'
import Event from "./event";

function Search (props) {

  const event = new Event(props.history)
  useEffect(() => {
    event.setKeyword(document.getElementById('propic'))
    // event.setList(documen)
  })


  const [keyword, setKeyword] = useState('');
  
  const onKeywordHandler = (event) => {
    setKeyword(document.getElementById('keyword'));
    console.log(document.getElementById('keyword'))
  };

  const getList = () => {
    console.log(this.state.value)
    axios.get('https://dev.plover.co.kr/ssafy/study/search/0',{
      params: {
        keyword: this.state.value
      }
    })
    .then ((res) => {
      const posts = res
      console.log(posts)
      console.log(res.data)
    })
    .catch ((err) => {
      console.log(err)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
      <Navbar className={styles.nav}>
        <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
        <span className={"color_black" + " " + styles.title}><Input id="keyword" placeholder="검색" onChange={onKeywordHandler}></Input>
        <button onClick={getList}>검색</button></span>
        {/* <i className={"fas fa-search"}></i> */}
      </Navbar>
      <Tabs className={styles.tab}>
        <div label="멘토링">
        <p>TAB 1 contents</p>
        </div>
        <div label="스터디">
        <p>TAB 2 contents</p>
        </div>
        <div label="사용자">
        <p>TAB 3 contents</p>
        </div>
      </Tabs>
      </div>
    </div>
  )
}

export default Search;