import React, {useState} from 'react';
import Navbutton from '../Navbar/Navbutton';
import styles from './Menu.module.css';
import {MenuItems} from './MenuItems';


const Menu = ({setShowMenu, showMenu}) => {


  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menu_top}>
          <h1 className={styles.appname}>PLOVER</h1>
          <div className={styles.navButtonBox}>
            <Navbutton setShowMenu={setShowMenu} showMenu={showMenu}/>
          </div>
        </div>
        <ul className={styles.itemList}>
          {
            MenuItems.map((item, index) => {
              return (
                <li key={index} className={styles.items}>
                  <a className={styles.item} href={item.url}>
                    {item.title}
                  </a>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;