import { Route } from 'react-router-dom';
import {
  Jangsoon, Jiyoung, Suyeon,
  Register, Verify, Verified,
  Login, Home, Profile, Alarm,
  MRegister, MList, MDetail, MEdit,
  SRegister, SList, SDetail,
  LManage, LView,
  Search, Follow,
  CList, CView
} from './pages';
import styles from "./App.module.css"
import "./global.color.css";
import "./firebaseConfig";

function App() {
  return (
    <div className={styles.App}>
      <Route exact path="/" component={Jangsoon} />
      <Route path="/jangsoon" component={Jangsoon} />
      <Route path="/jiyoung" component={Jiyoung} />
      <Route path="/suyeon" component={Suyeon} />
      <Route path="/register" component={Register} />
      <Route path="/verify" component={Verify} />
      <Route path="/verified" component={Verified} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/alarm" component={Alarm} />
      <Route path="/mentoring/register" component={MRegister} />
      <Route path="/mentoring/list" component={MList} />
      <Route path="/mentoring/detail" component={MDetail} />
      <Route path="/mentoring/edit" component={MEdit} />
      <Route path="/study/register" component={SRegister} />
      <Route path="/study/list" component={SList} />
      <Route path="/study/detail" component={SDetail} />
      <Route path="/live/manage" component={LManage} />
      <Route path="/live/view" component={LView} />
      <Route path="/search" component={Search} />
      <Route path="/follow" component={Follow} />
      <Route path="/chat/list" component={CList} />
      <Route path="/chat/view" component={CView} />
    </div>
  );
}

export default App;
