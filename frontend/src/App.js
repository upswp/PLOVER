import { Route } from 'react-router-dom';
import { Jangsoon, Jiyoung, Suyeon } from './pages';
import "./global.color.css";


function App() {
  return (
    <div>
      <Route exact path="/" component={function () {
        return (
          <div>메인홈</div>
        );
      }} />
      <Route path="/jangsoon" component={Jangsoon} />
      <Route path="/jiyoung" component={Jiyoung} />
      <Route path="/suyeon" component={Suyeon} />
    </div>
  );
}

export default App;
