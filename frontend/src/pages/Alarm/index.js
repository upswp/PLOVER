import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typo, Navbar } from '../../components'
import styles from './index.module.css'
import axios from 'axios'

function Alarm(props) {

  const history = useHistory()
  
  return(
    <div className={styles.container}>
    <Navbar className={styles.nav}>
      <div className={styles.redirect} onClick={() => { history.push("/login") }}></div>
      <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
      <span className={"color_black" + " " + styles.title}><Typo ty="h4">PLOVER</Typo></span>
    </Navbar>
    </div>
  )
}

export default Alarm;