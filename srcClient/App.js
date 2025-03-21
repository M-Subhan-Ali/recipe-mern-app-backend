import './App.css';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Saved_recipe } from './pages/saved-recipe';
import { Create_recipe } from './pages/create-recipe';
import { Navbar } from './components/navbar';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="App">

      <Router>
        <CookiesProvider>
        <Navbar/>
       <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/auth" element={ <Auth/> } />
        <Route path="/saved-recipe" element={ <Saved_recipe/> } />
        <Route path="/create-recipe" element={ <Create_recipe/> } />
       </Routes>
        </CookiesProvider>
      </Router>
      
    </div>
  );
}

export default App;
