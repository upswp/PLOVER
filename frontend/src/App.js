import { Route } from 'react-router-dom';
import {
  Register, Verify, Verified,
  Login, Home, Profile, Notification,
  MRegister, MList, MDetail, MEdit,
  SRegister, SList, SDetail, SEdit,
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
      <Route exact path="/" component={localStorage.getItem('id') ? Home : Login} />
      <Route path="/register" component={Register} />
      <Route path="/verify" component={Verify} />
      <Route path="/verified" component={Verified} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/notification" component={Notification} />
      <Route path="/mentoring/register" component={MRegister} />
      <Route path="/mentoring/list" component={MList} />
      <Route path="/mentoring/detail" component={MDetail} />
      <Route path="/mentoring/edit" component={MEdit} />
      <Route path="/study/register" component={SRegister} />
      <Route path="/study/list" component={SList} />
      <Route path="/study/detail" component={SDetail} />
      <Route path="/study/edit" component={SEdit} />
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
