import React, { useState } from 'react';
import styles from "./Tabs.module.css";

const Tabs = ({children}) => {

  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (event, newActiveTab) => {
    event.preventDefault();
    setActiveTab(newActiveTab);
  }

  return (
    <>
      <ul className={styles.tabs}>
        {children.map((tab) => {
          const label = tab.props.label;
          return (
            <li
              className={label === activeTab ? styles.current : "" } 
              key={label}
            >
              <a href="#" onClick={(event) => {handleClick(event, label)}} className={label === activeTab ? styles.current : "" }>{label}</a>
            </li>
          )
        })}
      </ul>
      {children.map((one) => {
        if (one.props.label === activeTab)
          return (
            <div key={one.props.label} className={styles.content}>
              {one.props.children}
            </div>
          );
      })}
    </>
  );
};

export default Tabs;