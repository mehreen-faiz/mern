import logo from './logo.svg';
import './App.css';
import Creates from './Components/Creates';
import {BrowserRouter, Route , Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Showdata from './Components/Showdata';
function App() {
  return (                                        
     <BrowserRouter>

    <div className="App">
     <Routes>
      <Route path="/" element={<Creates/>}/>
      <Route path="/s" element={<Showdata/>}/>
     </Routes>
    </div>
     </BrowserRouter>

  );
}

export default App;
