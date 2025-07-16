import logo from './logo.svg';
import './App.css';
import Creates from './Components/Creates';
import {BrowserRouter, Route , Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (                                        
     <BrowserRouter>

    <div className="App">
     <Routes>
      <Route path="/" element={<Creates/>}/>
     </Routes>
    </div>
     </BrowserRouter>

  );
}

export default App;
