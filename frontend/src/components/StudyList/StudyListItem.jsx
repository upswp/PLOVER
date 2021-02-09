import React from 'react';
import Skeleton from '../Skeleton/Skeleton';
import styles from './StudyListItem.module.css';

const StudyListItem = ({item}) => {

  return (
    <div className={styles.study_list_item}>
      <Skeleton shape="circle" className={styles.profile} />
      <div className={styles.study_info}>
        <h1 className={styles.study_username}>{item.user.userId}</h1>
        <p className={styles.study_time}>{item.date}</p>
      </div>
      <h2 className={styles.study_title}>{item.title}</h2>
    </div>
  )
};

export default StudyListItem;