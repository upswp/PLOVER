import React from 'react';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Imgbox from 'src/components/Imgcomponents/Imgbox';
import Navbar from 'src/components/Navbar/Navbar';
import Typo from 'src/components/Typo/Typo';
import styles from './index.module.css';


const Profile = (props) => {
  return (
    <>
      <Navbar color="white">
        <span onClick={() => {

          }}>
        <i className={"fas fa-chevron-left color_black " + styles.backIcon} style={{ cursor: "pointer" }}></i>
        </span>
        <h1 className={styles.userId}>user id</h1>
      </Navbar>
      
      <div className={styles.userBord}>
        <Imgbox src="" size="small" shape="circle" className={styles.userImg}/>
        <div className={styles.userInfo}>
          <div className={styles.userInfoItem}><h2 className={styles.userInfoNum}>12</h2><h3 className={styles.userInfoLet}>게시물</h3></div>
          <div className={styles.userInfoItem}><h2 className={styles.userInfoNum}>20k</h2><h3 className={styles.userInfoLet}>팔로워</h3></div>
          <div><h2 className={styles.userInfoNum}>78</h2><h3 className={styles.userInfoLet}>팔로잉</h3></div>
        </div>
      </div>
      <h1 className={styles.userNickname}>userNick</h1>
      <div className={styles.otherDisplayBtn}>
        <ButtonComp width="regular" type="base" textvalue="팔로우" className={styles.followBtn}/>
        <ButtonComp width="regular" type="base" textvalue="메시지" className={styles.messageBtn}/>
      </div>
      <div className={styles.userIntro}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto animi neque at dignissimos corrupti! Perferendis porro autem suscipit laudantium sunt praesentium, aliquam in, optio, nesciunt natus recusandae maiores iste doloribus!</div>

    </>
  );
};

export default Profile;