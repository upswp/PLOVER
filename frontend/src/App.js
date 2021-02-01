import { Route } from 'react-router-dom';
import {
  Jangsoon, Jiyoung, Suyeon,
  Register, Login,
  MRegister, MList, MDetail
} from './pages';
import styles from "./App.module.css"
import "./global.color.css";


function App() {
  return (
    <div className={styles.App}>
      <Route exact path="/" component={Jangsoon} />
      <Route path="/jangsoon" component={Jangsoon} />
      <Route path="/jiyoung" component={Jiyoung} />
      <Route path="/suyeon" component={Suyeon} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/mregister" component={MRegister} />
      <Route path="/mlist" component={MList} />
      <Route path="/mdetail" component={MDetail} />
    </div>
  );
}

export default App;
