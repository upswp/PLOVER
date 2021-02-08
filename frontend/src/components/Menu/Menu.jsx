import React, {useState} from 'react';
import styles from './Menu.module.css';
import {MenuItems} from './MenuItems';

import user1 from "./testdata/user1.jpg";
import Imgbox from 'src/components/Imgcomponents/Imgbox';

const Menu = (props) => {

  const [toggleState, setToggleState] = useState(false);

  const toggleButtonHandler = (event) => {
    setToggleState(!toggleState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.menu_top}>
          <h1 className={styles.appname}>PLOVER</h1>
          <div>
            <button className={styles.toggleButton} onClick={toggleButtonHandler}><i class="fas fa-bars"></i></button>
          </div>
        </div>
        <ul className={toggleState === true ? 'menu_sp' : 'menu_sp open'}>
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