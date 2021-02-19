import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import restapi from 'src/api/restapi';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Imgbox from 'src/components/Imgcomponents/Imgbox';
import Navbar from 'src/components/Navbar/Navbar';
import { useHistory } from 'react-router-dom'
import TextEditor from 'src/components/TextEditor/TextEditor';
import ReactHtmlParser from 'react-html-parser';


const Profile = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [checkFollow, setCheckFollow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    restapi.get(`/user/${props.match.params.id}`)
      .then((response) => {
        setUserInfo(response.data.data);
      })
      .catch(() => {
        props.history.push({pathname: '/home'})
      })
    
    restapi.get(`/follow/following/${props.match.params.id}`)
      .then((response) => {
        console.log(response);
        setCheckFollow(response.data.data);
      })
      .catch(() => {})
  }, [])

  const moveChatPage = () => {
    props.history.push(`/chat/view/${userInfo.no}`);
  }

  const onFollowHandler = () => {
    restapi.post('/follow', {toUserNo: props.match.params.id})
      .then((response) => {
        console.log(response)
        setUserInfo({
          ...userInfo,
          followerNum: userInfo.followerNum + 1
        })
        setCheckFollow(true);
      })
      .catch((error) => {
        alert('로그인이 필요한데 괜찮으시겠어요? ^)^')
        props.history.push({pathname:'/login'})
    })
  }

  const onFollowingHandler = () => {
    console.log(props.match.params.id)
    restapi.delete('/follow', {data:{toUserNo: props.match.params.id}})
      .then((response) => {
        console.log(response)
        setUserInfo({
          ...userInfo,
          followerNum: userInfo.followerNum - 1
        })
        setCheckFollow(false);
      })
      .catch((error) => {console.log(error)})
  }

  const renderBtnComponent = () => {
    const userId = localStorage.getItem('id');
    return (
      props.match.params.id === userId ? null :
      <div className={styles.otherDisplayBtn}>
        {
          checkFollow ? 
          <button className={styles.followingBtn} onClick={onFollowingHandler}>팔로잉</button> :
          <ButtonComp width="regular" type="base" textvalue="팔로우" className={styles.followBtn} onClick={onFollowHandler}/>
        }
        <ButtonComp width="regular" type="base" textvalue="메시지" className={styles.messageBtn} onClick={moveChatPage}/>
      </div>
    )
  }

  const renderProfileComponent = () => {
    const userId = localStorage.getItem('id');
    return (
      <div className={styles.userIntro}>
        {
          props.match.params.id !== userId ?
          <div className={styles.profileDescription}>{ ReactHtmlParser(userInfo.description) }</div> : 
          editMode ? 
          <TextEditor userInfo={userInfo} setUserInfo={setUserInfo} setEditMode={setEditMode} /> :
          <div className={styles.profileEdit}>
            <button onClick={() => {setEditMode(!editMode)}} className={styles.editBtn}>
              <p className={styles.editBtnText}>EDIT</p>
              <i class="fas fa-pencil-alt" className={styles.editIcon}></i>
            </button>
            <div className={styles.DescripForm}>
              <div className={styles.profileDescription}>
                { ReactHtmlParser(userInfo.description) }
              </div>
            </div>
          </div>
        } 
        <br/>
      </div>
    )
  }

  const moveFollowPage = () => {
    history.push({
      pathname: '/follow',
      state: {
        no: userInfo.no,
        username: userInfo.nickname
      }
    })
  }

  return (
    <>
      <Navbar color="white">
        <span onClick={() => {
          props.history.push({pathname: '/home'})  
        }}>
        <i className={"fas fa-chevron-left color_black " + styles.backIcon} style={{ cursor: "pointer" }}></i>
        </span>
        <h1 className={styles.userId}>{userInfo.nickname}</h1>
      </Navbar>
      
      <div className={styles.userBord}>
        <Imgbox src={userInfo.profileImageUrl} size="small" shape="circle" className={styles.userImg}/>
        <div className={styles.userInfo}>
          <div className={styles.userInfoItem}>
            <h2 className={styles.userInfoNum}>{userInfo.articleNum}</h2>
            <h3 className={styles.userInfoLet}>게시물</h3>
          </div>
          <div className={styles.userInfoItem} onClick={moveFollowPage}>
            <h2 className={styles.userInfoNum}>{userInfo.followerNum}</h2>
            <h3 className={styles.userInfoLet}>팔로워</h3>
          </div>
          <div onClick={moveFollowPage}>
            <h2 className={styles.userInfoNum}>{userInfo.followingNum}</h2>
            <h3 className={styles.userInfoLet}>팔로잉</h3>
          </div>
        </div>
      </div>
      <h1 className={styles.userNickname}>{userInfo.nickname}</h1>
      {renderBtnComponent()}
      {renderProfileComponent()}
    </>
  );
};

export default Profile;