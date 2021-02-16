import React from 'react';
import Imgbox from '../Imgcomponents/Imgbox';
import Skeleton from '../Skeleton/Skeleton';
import styles from './StudyListItem.module.css';

const StudyListItem = ({item}) => {
  const renderProfileImg = () => {
    if (item.profileImageUrl === 'images/default-image.png') {
      return (<Skeleton shape="circle" className={styles.profile}/>)
    } else {
      return (<Imgbox src={item.profileImageUrl} size="tiny" shape="circle" className={styles.profile}/>)
    }
  }

  return (
    <div className={styles.study_list_item}>
      {renderProfileImg()}
      <div className={styles.study_info}>
        <h1 className={styles.study_username}>{item.nickname}</h1>
        <p className={styles.study_time}>{item.date}</p>
      </div>
      <h2 className={styles.study_title}>{item.title}</h2>
    </div>
  )
};

export default StudyListItem;