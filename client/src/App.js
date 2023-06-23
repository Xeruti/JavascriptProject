import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { SavedRecipes } from './pages/recipes';
import { CreateRecepie } from './pages/createRecepie';
import { Navbar } from './components/navbar'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/createRecepie" element={<CreateRecepie/>}/>
          <Route path="/recepies" element={<SavedRecipes/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
