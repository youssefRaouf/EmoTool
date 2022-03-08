import './App.css';
import LoginScreen from './pages/LoginScreen';
// import {BrowserRouter as Router,Routes} from 'react-router-dom'
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SelectEmotionFilter from './pages/SelectEmotionFilter';
import GraphByTime from './pages/GraphByTime';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={
            <div style={{ width: 761, boxShadow: "2px 2px #b7b3b3" }}>
              <LoginScreen />
            </div>} />

          <Route path='/SelectEmotionFilter' element={
            <div style={{ width: 761, boxShadow: "2px 2px #b7b3b3" }}>
              <SelectEmotionFilter />
            </div>} />

          <Route path='/GraphByTime' element={<GraphByTime />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
