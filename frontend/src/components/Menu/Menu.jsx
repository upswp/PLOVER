import React from 'react';
import Navbutton from '../Navbar/Navbutton';
import styles from './Menu.module.css';
import { MenuItems } from './MenuItems';


const Menu = ({ setShowMenu, showMenu, history }) => {

  const moveLink = (url) => {
    console.log(url);
    if (url === '/profile') {
      const userId = localStorage.getItem('id');
      console.log(userId);
      history.push({ pathname: `${url}/${userId}` });
    } else {
      history.push({ pathname: url })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menu_top}>
          <h1 className={styles.appname}>PLOVER</h1>
        </div>
        <ul className={styles.itemList}>
          {
            MenuItems.map((item, index) => {
              return (
                <li key={index} className={styles.items} onClick={() => { moveLink(item.url) }}>
                  <div className={styles.item}>
                    {item.title}
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;