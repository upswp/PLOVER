import React from 'react';
import styles from "./Tabs.module.css";

const Tabs = ({children}) => {
  return (
    <>
      <ul className={styles.tabs}>
        {children.map((tab) => <li>{tab.props.label}</li>)}
        <li className={styles.current}>Tab1</li>
      </ul>
      {children.map((one) => (
        <div className={styles.content}>{one.props.children}</div>
      ))}
    </>
  );
};

export default Tabs;