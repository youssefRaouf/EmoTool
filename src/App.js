import './App.css';
import LoginScreen from './pages/LoginScreen';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SelectEmotionFilter from './pages/SelectEmotionFilter';
function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
        <Route exact path='/' element={
           <div style={{ width: 761,boxShadow:"2px 2px #b7b3b3" }}>
              <LoginScreen/>
            </div>} />
           
           <Route path='/SelectEmotionFilter' element={<SelectEmotionFilter/>}/>

          </Routes>
        </div>
     
    </Router>
  );
}

export default App;
